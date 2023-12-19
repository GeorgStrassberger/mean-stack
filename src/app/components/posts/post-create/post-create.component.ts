import { Component, OnInit } from '@angular/core';
import { Post } from '../../../interface/post';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PostsService } from '../../../service/posts/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent implements OnInit {

  post: Post | null = null;
  isLoading: boolean = false;
  form!: FormGroup;
  private mode: string = 'create';
  private postID: string | null = null;


  constructor(
    private postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators: [Validators.required]})
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postID')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.isLoading = true;
        if (this.postID) {
          this.postsService.getPost(this.postID).subscribe((postData)=>{
            this.isLoading = false;
            this.post = { id: postData._id , title: postData.title, content: postData.content };
            this.form.setValue({'title': this.post.title, 'content': this.post.content});
          });          
        }
      } else {
        this.mode = 'create';
        this.postID = null;
      }
    });
  }

  onSavePost() {
    if (this.form.invalid) {
    return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    }else{
      this.postsService.updatePost(this.postID!, this.form.value.title, this.form.value.content)
    }
    this.form.reset();
  }
}
