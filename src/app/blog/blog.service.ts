import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get( url + `/api/posts/`);
  }

  createPost(body) {
    return this.http.post( url + '/api/posts/post', body);
  }

  deletePost(id) {
    return this.http.delete( url + '/api/posts/', id);
  }

  editPost(body) {
    return this.http.post( url + '/api/posts/post', body);
  }
}
