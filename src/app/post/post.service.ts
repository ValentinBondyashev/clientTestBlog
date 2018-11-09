import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const url = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {
  }

  getPost(id) {
    return this.http.get( url + `/api/posts/post/${id}`);
  }

  deletePost(id) {
    return this.http.delete( url + `/api/posts/${id}`);
  }

  updatePost(body) {
    return this.http.post( url + '/api/posts/update', body);
  }

  uploadFile(body) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type':  'multipart/form-data',
      'Authorization': `Token ${token}`
    });
    return this.http.post( url + '/api/upload/upload', body);
  }
}
