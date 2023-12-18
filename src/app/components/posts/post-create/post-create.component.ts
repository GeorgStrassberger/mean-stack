import { Component, OnInit } from '@angular/core';
import { Post } from '../../../interface/post';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../../service/posts/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent implements OnInit {
  enteredTitle: string = '';
  enteredContent: string = '';
  post: Post | null = null;
  isLoading: boolean = false;
  private mode: string = 'create';
  private postID: string | null = null;


  constructor(
    private postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postID')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.isLoading = true;
        if (this.postID) {
          this.postsService.getPost(this.postID).subscribe((postData)=>{
            this.isLoading = false;
            this.post = { id: postData._id , title: postData.title, content: postData.content };
          });
        }
      } else {
        this.mode = 'create';
        this.postID = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.invalid) {
    return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postsService.addPost(form.value.title, form.value.content);
    }else{
      this.postsService.updatePost(this.postID!, form.value.title, form.value.content)
    }
    form.resetForm();
  }
}
