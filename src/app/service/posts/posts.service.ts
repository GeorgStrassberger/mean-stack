import { Injectable } from '@angular/core';
import { Post } from '../../interface/post';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ message: string, posts: any[]; }>(`http://localhost:3000/api/posts`).pipe(map((postData)=>{
      return postData.posts.map((post) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      });
    })).subscribe((pipePosts) => {
      this.posts = pipePosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(post: Post) {
    this.http.post<{ message: string, postID: string }>(`http://localhost:3000/api/posts`, post).subscribe((responseData) => {
      const id = responseData.postID;
      post.id = id;
      console.log('responseMessage: ', responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(postID: string){
    this.http.delete(`http://localhost:3000/api/posts/${postID}`).subscribe(()=>{
      const updatedPosts = this.posts.filter(post => post.id !== postID);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

}
