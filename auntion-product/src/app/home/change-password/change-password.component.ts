import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {HomeService} from '../service/home.service';
import {ActivatedRoute} from '@angular/router';
import {validate} from "codelyzer/walkerFactory/walkerFn";


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  message: string;
  token: string;

  constructor(private homeService: HomeService, private route: ActivatedRoute) {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token);
    this.changePasswordForm = new FormGroup({
      password: new FormControl('',[]),
      confirmPass: new FormControl(''),
    }, {validators: identityConfirmPassword});
  }

  ngOnInit(): void {
  }

  changePassword() {
    const password = this.changePasswordForm.value.password;
    this.homeService.changePassword(password, this.token).subscribe(data => {
      this.message = data;
    });
    console.log(this.message);
  }
}

function identityConfirmPassword(control: AbstractControl) {
  const formControl = control.value;
  return formControl.password === formControl.confirmPass ? null : {identityPassword: true};
}
