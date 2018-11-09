import { Component, OnInit } from '@angular/core';
import { BlogService } from './blog.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { roles } from '../constants';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [BlogService]
})
export class BlogComponent implements OnInit {
  private posts;
  private userId;
  private countPosts;
  private userRole;
  private permission;

  public postForm: FormGroup = new FormGroup({
    title: new FormControl(),
    post: new FormControl()
  });

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit() {
    this.getPosts( 1 );
    this.userId = localStorage.getItem('id');
    this.userRole = localStorage.getItem('role');
    this.permission = Number(this.userRole) === roles.admin || Number(this.userRole) === roles.editor;
  }

  getPosts(page) {
    this.blogService.getPosts(page).subscribe(data => {
      this.posts = data['posts'];
      this.countPosts = data['countPosts'];
    });
  }

  deletePost(id) {
    this.blogService.deletePost(id).subscribe(data => {
      this.posts = this.posts.filter(post => post['_id'] !== data['post']['_id']);
    });
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
    this.blogService.createPost(body).subscribe( data => {
      this.posts.push(data['post']);
    });
    this.postForm.reset();
  }

  filter() {
    this.posts = this.posts.filter(post => post.userId === this.userId);
  }

  readMore(id) {
    this.router.navigate([`post/${id}`]);
  }

  changePage(e) {
    this.getPosts( e['pageIndex'] + 1 );
  }

}
