import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MemberService} from '../service/member.service';
import {Router, RouterLink} from '@angular/router';
import {Address} from './address';
import {Districts} from './districts';
import {Ward} from './ward';
import {Account} from '../../model/Account';
import {MemberDTO} from '../../model/MemberDTO';
import {checkUsername} from './validate/ValidateUsername';

@Component({
  selector: 'app-sign-up-member',
  templateUrl: './sign-up-member.component.html',
  styleUrls: ['./sign-up-member.component.css']
})
export class SignUpMemberComponent implements OnInit {
  formCreateAccount: FormGroup;
  account: Account;

  /* code captcha*/
  siteKey: string;

  // check
  check = true;
  messageAlert: string[];

  // Cac bien chua thanh pho, quan, huyen
  addressList: Address[];
  districtList: Districts[];
  wardList: Ward[];

  accountCreate: MemberDTO;

  /* Check policy form */
  checkPolicy = false;

  constructor(private memberService: MemberService,
              private route: Router,
  ) {
    this.siteKey = '6Ld6OusgAAAAAOS157FTIGo6EkS3r3EAsGTJU-Xx';
  }

  ngOnInit(): void {
    this.formCreateAccount = new FormGroup({
      nameMember: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-zỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ' ]+$/)]),
      dateOfBirthMember: new FormControl('', [Validators.required]),
      emailMember: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      city: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required]),
      phoneMember: new FormControl('', [Validators.required, Validators.pattern(/^(84)+([0-9]{9})$/)]),
      idCardMember: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{8,10}$/)]),
      username: new FormControl('',
        Validators.compose([Validators.required, Validators.pattern(/^[a-zA-z0-9]{5,20}$/)]), [checkUsername(this.memberService)]),
      password: new FormGroup({
        password1: new FormControl('', [Validators.required, Validators.minLength(6)],
        ),
        cfPassword: new FormControl('', [Validators.required])
      }, comparePassword),

    });


    /// Phuong thuc lay ra tinh thanh pho
    this.memberService.getAddress().subscribe(data => {
      this.addressList = data;
    }, error => {
      console.log('err');
    });

  }

  // Phuong thuc lay ra quan huyen khi chon thanh pho
  setDistricts() {
    for (let i = 0; i < this.addressList.length; i++) {
      if (this.addressList[i].Name === (document.getElementById('city') as HTMLInputElement).value) {
        this.districtList = this.addressList[i].Districts;
      }
    }
  }

  // Phuong thuc lay ra phuong xa khi chon quan huyen
  setWards() {
    for (let i = 0; i < this.districtList.length; i++) {
      if (this.districtList[i].Name === (document.getElementById('district') as HTMLInputElement).value) {
        this.wardList = this.districtList[i].Wards;
        break;
      }
    }
  }

  // xac thuc mat khau
  comparePassword(c: AbstractControl): { password_not_match: boolean } {
    if (c.get('password1').value !== c.get('cfPassword').value) {
      return {password_not_match: true};
    }
  }

  // tao tai khoan
  createAccount() {
    console.log(this.formCreateAccount);
    this.messageAlert = [];
    if (!this.checkPolicy) {
      console.log('check');
    } else {
      if (this.formCreateAccount.invalid) {
        if (this.formCreateAccount.get('username')?.errors?.required || this.formCreateAccount.get('password')?.errors?.required) {
          this.messageAlert.push('Plese enter username !');
        }
        if (this.formCreateAccount.get('username')?.errors?.checkUsername) {
          this.messageAlert.push('username ' + this.formCreateAccount.value.username + ' must created!');
        }
      } else {
        this.accountCreate = this.formCreateAccount.value;
        this.accountCreate.password = this.formCreateAccount.get(['password', 'password1']).value;

        this.memberService.addNewAccount(this.accountCreate).subscribe(() => {
        }, () => {
        }, () => {
          this.route.navigateByUrl('/home');
        });
      }
    }
  }

  /* Getter for form */
  get password() {
    return this.formCreateAccount.get(['account', 'password', 'password1']);
  }

  checkedClauseAccount($event: any) {
    this.checkPolicy = $event.target.checked;
  }
}

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password1 === v.cfPassword) ? null : {passwordnotmatch: true};
}
