import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../../interface/post';
import { PostsService } from '../../../service/posts/posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css',
})
export class PostListComponent implements OnInit, OnDestroy {
  
  posts: Post[] = [];
  private postSubscription!: Subscription;
  isLoading: boolean = false;
  // Paginator settings
  totalPosts: number = 0;
  postsPerPage: number = 5;
  currentPage: number = 1;
  pageSizeOptions: number[] = [1,2,5,10];

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.postSubscription = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: {posts: Post[],postCount: number}) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      });
  }


  onChangedPage(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex +1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }


  onDelete(postID: string){
    this.isLoading = true;
    this.postsService.deletePost(postID).subscribe(()=>{
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }


  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
