import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [HttpService]
})

export class RegisterComponent {
  public registerForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    nickName: new FormControl()
  });
  constructor(private httpService: HttpService, private router: Router) {}
  submit() {
    this.httpService.registretion(this.registerForm.value).subscribe(
      data => {
        localStorage.setItem('email', data['user']['email']);
        localStorage.setItem('token', data['user']['token']);
        localStorage.setItem('nickName', data['user']['nickName']);
        localStorage.setItem('id', data['user']['_id']);
        this.router.navigate(['']);
      },
      err => console.log(err)
    );
  }
}
