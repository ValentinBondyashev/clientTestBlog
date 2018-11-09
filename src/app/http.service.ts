import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = 'http://localhost:8000';


@Injectable()
export class HttpService {
  private headers;
  private token;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders({ 'Authorization': `Token ${this.token}` });
  }

  registretion(user) {
    const body = {
      user: {
        email: user.email,
        password: user.password,
        nickName: user.nickName
      }
    };
    return this.http.post(url + '/api/users', body);
  }

  login(user) {
    const body = {
      user: {
        email: user.name,
        password: user.password
      }
    };
    return this.http.post(url + '/api/users/login', body);
  }

  getAllTasks() {
    return this.http.get( url + '/api/tasks/', {headers: this.headers});
  }

  createTask(task) {
    const body = {
      task: {
        userId: localStorage.getItem('id'),
        task: task.task,
        dateCreate: task.dateCreate,
        edit: task.edit
      }
    };
    return this.http.post(url + '/api/tasks/task', body, {headers: this.headers});
  }

  deleteTask(id) {
    return this.http.delete(url + '/api/tasks/' + id, {headers: this.headers});
  }

  updateTask( task, id ) {
    const body = {
        task,
        id
    };

    return this.http.post(url + '/api/tasks/update', body, {headers: this.headers});
  }

}
