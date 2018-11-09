import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from './post.service';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { FormControl, FormGroup } from '@angular/forms';

const URL = 'http://localhost:8000/api/upload/upload';

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
  private edit;
  private path;

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'image'});

  public postForm: FormGroup = new FormGroup({
    title: new FormControl(),
    text: new FormControl()
  });

  constructor( private router: Router, private postService: PostService ) {
    this.userId = localStorage.getItem('id');
    this.edit = false;
  }

  getPost() {
    const url = this.router.url.split('/');
    const id = url[url.length - 1];
    this.postId = id;
    this.postService.getPost( id ).subscribe(data => {
      this.post = data['post'][0];
      this.title = this.post.title;
    });
  }

  ngOnInit() {
    this.getPost();
    // upload file
    const url = this.router.url.split('/');
    const id = url[url.length - 1];
    this.postId = id;
    this.userId = localStorage.getItem('id');
    this.uploader.options.headers = [];
    this.uploader.options.headers.push({ name: 'postId', value: this.postId });
    this.uploader.options.headers.push({ name: 'userId', value: this.userId });
    this.uploader.setOptions(this.uploader);
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any) => {
      this.path = JSON.parse(response).filePath;
    };
  }

  upload(file) {
    const formData = new FormData();
    formData.append('file[]', file.target[1].files[0], file.target[1].files[0].name);
   /* for (let pair of formData.entries())
    {
      console.log(pair[0]+ ', '+ pair[1]);
    } */
    this.postService.uploadFile(formData).subscribe( data => console.log(data), err => console.log(err));
  }

  updatePost() {
    const form = this.postForm.value;
    const body = {
      title: form.title || this.title,
      text: form.text || this.post,
      postId: this.postId
    };
    this.postService.updatePost(body).subscribe(data => console.log(data));
  }

  editPost() {
    this.edit = true;
  }

}
