import {Component, OnInit} from '@angular/core';
import {Account} from '../../model/Account';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../service/login.service';
import {TokenStorageService} from '../service/token-storage.service';
import {ShareService} from '../service/share.service';
import {ToastrService} from 'ngx-toastr';
import {Role} from '../../model/Role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: Account;
  formLogin: FormGroup;
  errorMessage = '';
  accountList: Account[];
  // roles: string[] = [];
  roles: Role;
  show = false;
  rememberMeToken: string;

  constructor(
    // private authService: SocialAuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private loginServer: LoginService,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private toast: ToastrService,
    private shareService: ShareService
  ) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getUser()) {
      this.router.navigateByUrl('/home');
    }
    this.formLogin = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        remember_me: ['']
      }
    );
  }

  login(event) {
    this.formLogin.value.remember_me = this.tokenStorageService;
    this.loginServer.login(this.formLogin.value).subscribe(
      (data) => {
        if (this.formLogin.value) {
          this.tokenStorageService.saveTokenLocal(this.formLogin.value.remember_me);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(this.formLogin.value.remember_me);
          this.tokenStorageService.saveUserLocal(data);
        }
        // if (this.username.isBlock !== true) {
        this.loginServer.isLoggedIn = true;
        this.username = this.tokenStorageService.getUser().username;
        this.roles = this.tokenStorageService.getUser().roles;
        this.rememberMeToken = this.tokenStorageService.getToken();
        this.formLogin.reset();
          // window.location.reload();
        this.router.navigateByUrl('/home');
        this.shareService.sendClickEvent();
        // }else {
        //   this.toast.error('Account is Block !!', 'Login Failed: ');
        // }
      },
      err => {
        this.loginServer.isLoggedIn = false;
        this.toast.error('Try again later !!', 'Login Failed: ');
      }
    );
  }

  showPsw() {
    this.show = !this.show;
  }

  rememberMe(event) {
    console.log(event.target.checked);
    if (event.target.checked === true) {
      console.log(this.rememberMeToken);
      localStorage.setItem('remember_me', this.tokenStorageService.getUser().token);
    } else {
      localStorage.removeItem('remember_me');
    }
  }

  // logInWithGoogle(){
  //   this.shareService.googleSignIn();
  // }
  // signInHandler(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
  //     localStorage.setItem('google_auth', JSON.stringify(data));
  //     console.log('day la data ne ' + data);
  //     this.router.navigateByUrl('/home').then();
  //   });
  // }

}
