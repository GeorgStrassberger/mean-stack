import { Injectable } from '@angular/core';
import { Post } from '../../interface/post';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

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

  getPost(id: string){
    return this.http.get<{_id: string, title: string, content: string}>(`http://localhost:3000/api/posts/${id}`);
  }


  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content} 
    this.http.post<{ message: string, postID: string }>(`http://localhost:3000/api/posts`, post).subscribe((responseData) => {
      const id = responseData.postID;
      post.id = id;
      console.log('responseMessage: ', responseData.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
    });
  }

  updatePost(postID: string, title:string, content: string){
    const post: Post = { id: postID, title:title , content: content};
    this.http.put(`http://localhost:3000/api/posts/${postID}`, post).subscribe((response) => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id ===post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/']);
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
