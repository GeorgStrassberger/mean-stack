import { Component, OnInit } from '@angular/core';
import { Post } from '../../../interface/post';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../../service/posts/posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from '../../../models/mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css',
})
export class PostCreateComponent implements OnInit {

  post: Post | null = null;
  isLoading: boolean = false;
  form!: FormGroup;
  imagePreview: string| ArrayBuffer | null = null;
  private mode: string = 'create';
  private postID: string | null = null;


  constructor(
    private postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      'title': new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      'content': new FormControl(null, {validators: [Validators.required]}),
      'image': new FormControl(null, {validators: [Validators.required], asyncValidators: [mimeType]})
    })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postID')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.isLoading = true;
        if (this.postID) {
          this.postsService.getPost(this.postID).subscribe((postData)=>{
            this.isLoading = false;
            this.post = { 
              id: postData._id, 
              title: postData.title, 
              content: postData.content,
              imagePath: postData.imagePath
            };
            this.form.setValue({
              'title': this.post.title, 
              'content': this.post.content,
              'image': this.post.imagePath
            });
          });          
        }
      } else {
        this.mode = 'create';
        this.postID = null;
      }
    });
  }


  onImagePicked(event: Event){
    const inputImage = (event.target as HTMLInputElement);
    const file = inputImage.files![0];
    this.form.patchValue({'image': file});
    this.form.get('image')?.updateValueAndValidity();
    console.log('File: ',file);
    console.log('this.form: ',this.form);
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }


  onSavePost() {
    if (this.form.invalid) {
    return;
    }
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
    }else{
      this.postsService.updatePost(this.postID!, this.form.value.title, this.form.value.content, this.form.value.image)
    }
    this.form.reset();
  }




}
