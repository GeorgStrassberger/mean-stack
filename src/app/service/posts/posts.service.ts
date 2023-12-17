import { Injectable } from '@angular/core';
import { Post } from '../../interface/post';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  
  // constructor() { }

  getPosts():Post[]{
    // create a new arry, no pointer
    return [...this.posts];
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(post:Post){
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

}
