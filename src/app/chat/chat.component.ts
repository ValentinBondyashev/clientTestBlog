import {Component, OnInit} from '@angular/core';
import {ChatService} from './chat.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})

export class ChatComponent implements OnInit {
  private messages;
  public messageGroup: FormGroup = new FormGroup({
    message: new FormControl()
  });
  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.getChat();
    setInterval(() => this.getChat(),
      10000);
  }

  getChat() {
    this.chatService.getAllMessages().subscribe((messages) => {
      this.messages = messages['messages'];
    });
  }

  submit() {
    const message = { message: this.messageGroup.value.message, nickName: localStorage.getItem('nickName') };
    this.chatService.send(message).subscribe();
    this.messageGroup.reset();
  }

}
