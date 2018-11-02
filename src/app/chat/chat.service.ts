import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:8000';

@Injectable()



export class ChatService {

  constructor(private http: HttpClient) {}

  getAllMessages() {
    return this.http.get( url + '/api/messages');
  }

  send(message) {
    const body = {
      message
    };
    return this.http.post(url + '/api/messages/message', body );
  }
}
