import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PostService} from './post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  providers: [PostService]
})
export class PostComponent implements OnInit {
  private postId;
  private post;
  private userId;
  private title;
  private edit = true;
  constructor( private router: Router, private postService: PostService ) {
    this.userId = localStorage.getItem('id');
  }

  getAllPosts() {
    const url = this.router.url.split('/');
    const id = url[url.length - 1];
    this.postId = id;
    this.postService.getPost( id ).subscribe(data => {
      this.post = data['post'][0];
      this.title = this.post.title;
    });
  }

  ngOnInit() {
    this.getAllPosts();
  }

  edit() {
    this.edit = false;
  }

}
