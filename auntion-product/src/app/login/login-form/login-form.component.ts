import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from '../service/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ConnectFirebaseService} from '../../chat-app/services/connect-firebase.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService
    , private router: Router, private connectFirebaseService: ConnectFirebaseService) {
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: [''],
      password: ['']
    });
  }

  login() {
    this.loginService.handleLogin(this.formLogin.value).subscribe(data => {
      /* Save data to local storage */
      /* Check roles */
      if (data.roles.length === 1) {
        /* It user */
        localStorage.setItem('user', JSON.stringify(data));
        /* Set status for account */
        this.connectFirebaseService.setStatusForAccount(JSON.parse(localStorage.getItem('user')).id, true);
      } else {
        localStorage.setItem('admin', JSON.stringify(data));
        /* Set status for account */
        this.connectFirebaseService.setStatusForAccount(JSON.parse(localStorage.getItem('admin')).id, true);
      }
    });
  }

  logout() {
    this.loginService.logout();
  }
}
