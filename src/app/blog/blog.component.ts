import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { Router } from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [BlogService]
})
export class BlogComponent implements OnInit {
  private posts;
  private userId;
  public postForm: FormGroup = new FormGroup({
    title: new FormControl(),
    post: new FormControl()
  });
  constructor(private blogService: BlogService, private router: Router) {}

  filter() {
    this.posts = this.posts.filter(post => post.userId === this.userId);
  }

  getAllPosts() {
    this.blogService.getAllPosts().subscribe(data => {
      this.posts = data['posts'];
    });
  }

  ngOnInit() {
    this.userId = localStorage.getItem('id');
    this.getAllPosts();
  }

  readMore(id) {
    this.router.navigate([`post/${id}`]);
  }

  createPost() {
    const form = this.postForm.value;
    const body = {
      post: {
        title: form.title,
        text: form.post,
        userName: localStorage.getItem('nickName'),
        userId: localStorage.getItem('id')
      }
    };
    this.blogService.createPost(body).subscribe( data => this.posts.push(data.post));
    this.postForm.reset();
  }

}
