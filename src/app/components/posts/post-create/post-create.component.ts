import { Component } from '@angular/core';
import { Post } from '../../../interface/post';
import { NgForm } from '@angular/forms';
import { PostsService } from '../../../service/posts/posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {

  enteredTitle: string = '';
  enteredContent: string = '';

  constructor(private postsService: PostsService){}

  onAddPost(form: NgForm) {
    if (!form.invalid) {
      const post: Post = { id: null, title: form.value.title, content: form.value.content };
      this.postsService.addPost(post);
    }
    form.resetForm();
  }


}
