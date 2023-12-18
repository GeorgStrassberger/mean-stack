import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../../interface/post';
import { PostsService } from '../../../service/posts/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit, OnDestroy {
  
  posts: Post[] = [];
  private postSubscription!: Subscription;
  isLoading: boolean = false;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postSubscription = this.postsService
      .getPostUpdateListener()
      .subscribe((posts:Post[]) => {
        this.isLoading = false;
        this.posts = posts
      });
  }

  onDelete(postID: string){
    this.postsService.deletePost(postID);
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
