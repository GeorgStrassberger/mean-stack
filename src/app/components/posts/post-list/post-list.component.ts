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

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postSubscription = this.postsService
      .getPostUpdateListener()
      .subscribe((posts) => (this.posts = posts));
  }


  onEdit(){}

  onDelete(){}

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
