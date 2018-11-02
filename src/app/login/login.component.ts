import { Component } from '@angular/core';
import {HttpService} from '../http.service';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [HttpService]
})
export class LoginComponent {
  public loginForm: FormGroup = new FormGroup({
    name: new FormControl(),
    password: new FormControl()
  });

  constructor(private httpService: HttpService, private router: Router) {}

  submit() {
    this.httpService.login(this.loginForm.value).subscribe(
      data => {
        console.log(data)
        localStorage.setItem('email', data['user']['email']);
        localStorage.setItem('nickName', data['user']['nickName']);
        localStorage.setItem('token', data['user']['token']);
        localStorage.setItem('id', data['user']['_id']);
        this.router.navigate(['']);
      },
      err => console.log(err)
    );
  }
}
