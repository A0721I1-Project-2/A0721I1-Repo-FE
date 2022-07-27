import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {HomeService} from '../service/home.service';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  message: string;
  token: string;
  public showPassword: boolean = false;

  constructor(private homeService: HomeService, private route: ActivatedRoute) {
    this.token = this.route.snapshot.paramMap.get('token');
    this.changePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPass: new FormControl('', [Validators.required]),
    }, {validators: identityConfirmPassword});
  }

  ngOnInit(): void {
  }

  changePassword() {
    const password = this.changePasswordForm.value.password;
    this.homeService.changePassword(password, this.token).subscribe(data => {
      this.message = data;
      if (this.message === 'Change password successfully') {
        this.message = null;
        Swal.fire(
          'Change password successfully!',
          '',
          'success'
        );
      }
    });
  }

}

function identityConfirmPassword(control: AbstractControl) {
  const formControl = control.value;
  return formControl.password === formControl.confirmPass ? null : {identityPassword: true};
}
