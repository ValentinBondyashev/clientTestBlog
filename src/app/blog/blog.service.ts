import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const url = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private headers;
  private token;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({ 'Authorization': `Token ${this.token}` });
  }

  getPosts(page) {
    return this.http.get( url + `/api/posts/${page}`, {headers: this.headers});
  }

  createPost(body) {
    return this.http.post( url + '/api/posts/post', body, {headers: this.headers});
  }

  deletePost(id) {
    return this.http.delete( url + `/api/posts/${id}`, {headers: this.headers});
  }

  editPost(body) {
    return this.http.post( url + '/api/posts/post', body, {headers: this.headers});
  }



}
