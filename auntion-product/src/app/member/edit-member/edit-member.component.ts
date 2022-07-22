import { Component, OnInit } from '@angular/core';
import {Member} from '../../model/Member';
import {FormBuilder, Validators} from '@angular/forms';
import {MemberService} from '../service/member.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {

  member: Member;
  idAccount: number;

  editForm = this.fb.group({
    idMember: ['', Validators.required],
    nameMember: ['', Validators.required],
    dateOfBirthMember: ['', Validators.required],
    emailMember: ['', Validators.required],
    addressMember: ['', Validators.required],
    phoneMember: ['', Validators.required],
    idCardMember: ['', Validators.required],
    paypalMember: ['', Validators.required],
    flagDelete: ['', Validators.required],
    account: ['', Validators.required],
    invoiceList: ['', Validators.required],
    point: ['', Validators.required],
    paymentList: ['', Validators.required],
    rank: ['', Validators.required],
    cart: ['', Validators.required],
    products: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private service: MemberService,
              private router: Router, private activatedRoute: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      this.service.findByIdAccount(id).subscribe(next => {
        this.member = next;
        console.log(this.member);
        this.editForm.patchValue(next
        //   idAccount: this.member.account.idAccount,
        //   idMember: this.member.idMember,
        //   nameMember: this.member.nameMember,
        //   dateOfBirthMember: this.member.dateOfBirthMember,
        //   emailMember: this.member.emailMember,
        //   addressMember: this.member.addressMember,
        //   phoneMember: this.member.phoneMember,
        //   idCardMember: this.member.idCardMember,
        //   paypalMember: this.member.paypalMember,
        //   flagDelete: this.member.flagDelete,
        //   account: this.member.account,
        //   invoiceList: this.member.invoiceList,
        //   point: this.member.point,
        //   paymentList: this.member.paymentList,
        //   rank: this.member.rank,
        //   cart: this.member.cart,
        //   products: this.member.products,
        // }
        )
        this.editForm.get('account').setValue(this.member.account.idAccount, {onlySelf: true});
      })
    })
  }

  editSubmit() {
      this.member = this.editForm.value;
      console.log(this.member);
      for (let i = 0; i < this.idAccount; i++) {
        // tslint:disable-next-line:triple-equals
        if ((this.member.account.idAccount) == (this.idAccount)) {
          this.member.account.idAccount = this.idAccount;
        }
      }
      this.service.editMember(this.member).subscribe(
        () => {
        },
        () => {
        },
        () => {
          this.service.message = 'Chỉnh sửa thành công ' + this.member.nameMember;
          this.router.navigateByUrl('/member/profile/' + this.idAccount);
        },
      );
    }


}
