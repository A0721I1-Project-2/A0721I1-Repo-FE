import {Component, OnInit} from '@angular/core';
import {HomeService} from '../service/home.service';
import {FormControl, FormGroup} from '@angular/forms';

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
      username: new FormControl(''),
      email: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  forgotPassword() {
    const username = this.forgotPasswordForm.value.username;
    const email = this.forgotPasswordForm.value.email;
    this.homeService.processForgotPasswordForm(username, email).subscribe(data => {
      this.message = data;
    });
  }
}
