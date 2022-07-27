import {Component, OnInit} from '@angular/core';
import {Account} from '../../model/Account';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../service/login.service';
import {TokenStorageService} from '../service/token-storage.service';
import {ShareService} from '../service/share.service';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: Account;
  formLogin: FormGroup;
  errorMessage = '';
  // detailOrder: OderDetail[] = [];
  accounts: Account[] = [];
  accountList: Account[];
  user: string[] = [];
  roles: string[] = [];
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
    private shareService: ShareService,
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
    this.loginServer.checkAccountBlock(this.formLogin.value.username).subscribe(data => {
      this.accounts = data;
      console.log(this.accounts);
      if (data !== null) {
        this.router.navigate(['/login/authentication']);
        this.toast.error('Your account is block !!', 'Login Failed: ');
      } else {
        this.formLogin.value.remember_me = this.tokenStorageService;
        this.loginServer.login(this.formLogin.value).subscribe(
          (next) => {
            if (this.formLogin.value) {
              this.tokenStorageService.saveTokenLocal(this.formLogin.value.remember_me);
              this.tokenStorageService.saveUserLocal(next);
            } else {
              this.tokenStorageService.saveTokenSession(this.formLogin.value.remember_me);
              this.tokenStorageService.saveUserLocal(next);
            }
            this.username = this.tokenStorageService.getUser().username;
            this.roles = this.tokenStorageService.getUser().roles;
            this.router.navigate(['/home']);
            this.loginServer.isLoggedIn = true;
            this.rememberMeToken = this.tokenStorageService.getToken();
            this.formLogin.reset();
            this.router.navigateByUrl('/home');
            window.location.reload(); // reload lại trang thì chat bên Tuấn mới hoạt đông
            this.shareService.sendClickEvent();
          },
          err => {
            this.loginServer.isLoggedIn = false;
            this.toast.error('Try again later !!', 'Login Failed: ');
          });
      }
    });
  }

  // swal('Login Failed!', 'Your Account has block!', 'error');
  // } else {
  //   swal('Login Failed!', 'Your Account has block!', 'error');
  // }
  // console.log('day la role' + this.roles.indexOf(role));

  // if (this.username.isBlock !== true) {
  // const actualRole: string [] = [];
  // for (const role of this.roles){
  //   console.log(role.indexOf(roles) + 'day moi la role ne');
  // }
  // if (actualRole.indexOf('ROLE_MANAGER') !== -1) {
  //   console.log(actualRole + 'day la role ne');
  // }else {
  //   console.log(actualRole + 'not role');
  // }
  // window.location.reload();

  // }else {
  //   this.toast.error('Account is Block !!', 'Login Failed: ');
  // }


  showPsw() {
    const passField = document.querySelector('#passIn');
    const showBtn = document.querySelector('#icon ');
    // @ts-ignore
    // tslint:disable-next-line:only-arrow-functions
    if (passField.type === 'password'){
      // @ts-ignore
      passField.type = 'text';
      showBtn.classList.remove('fa-eye-slash');
      showBtn.classList.add('fa-eye');
    }else{
      // @ts-ignore
      passField.type = 'password';
      showBtn.classList.remove('fa-eye');
      showBtn.classList.add('fa-eye-slash');
    }
  }


  // rememberMe(event) {
  //   console.log(event.target.checked);
  //   if (event.target.checked === true) {
  //     console.log(this.rememberMeToken);
  //     localStorage.setItem('remember_me', this.tokenStorageService.getUser().token);
  //   } else {
  //     localStorage.removeItem('remember_me');
  //   }
  // }

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
