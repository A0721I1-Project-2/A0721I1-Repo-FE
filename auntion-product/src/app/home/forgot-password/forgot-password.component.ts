import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  message: string;

  constructor(private homeService: HomeService) {
    this.forgotPasswordForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {
  }

  forgotPassword() {
    const username = this.forgotPasswordForm.value.username;
    const email = this.forgotPasswordForm.value.email;
    // this.homeService.processForgotPasswordForm(username, email).subscribe(data => {
    //   this.message = data;
    // });
    this.homeService.checkAccount(username, email).subscribe(check => {
      console.log(check);
      if (check !== null) {
        this.homeService.processForgotPasswordForm(username, email).subscribe(data => {
        });
        this.message = 'We have sent a link to change the password. Please open email to check';
      } else {
        this.message = 'Wrong username or email';
      }
    });
  }
}
