import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {
  }

  getPost(id) {
    return this.http.get( url + `/api/posts/${id}`);
  }

  deletePost(id) {
    return this.http.delete( url + '/api/posts/', id);
  }

  editPost(body) {
    return this.http.post( url + '/api/posts/post', body);
  }
}
