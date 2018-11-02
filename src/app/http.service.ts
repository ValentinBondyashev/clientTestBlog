import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = 'http://localhost:8000';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) { }

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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Token ${token}` });

    return this.http.get( url + '/api/tasks/', {headers});
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
    return this.http.post(url + '/api/tasks/task', body);
  }

  deleteTask(id) {
    const token = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Token ${token}`
      })
    };
    return this.http.delete(url + '/api/tasks/' + id, httpOptions);
  }

  updateTask( task, id ) {
    const body = {
        task,
        id
    };

    return this.http.post(url + '/api/tasks/update', body);
  }

}
