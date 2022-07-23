import { Component, OnInit } from '@angular/core';
import {MemberService} from '../service/member.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Member} from '../../model/Member';

@Component({
  selector: 'app-profile-member',
  templateUrl: './profile-member.component.html',
  styleUrls: ['./profile-member.component.css']
})
export class ProfileMemberComponent implements OnInit {

  constructor(private profileMember: MemberService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }
  idAccount: number;
  profileViewMember: Member;
  accountMember: Account[];
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.idAccount = + param.get('id');
      console.log(this.idAccount);
      // @ts-ignore
      this.profileMember.findByIdAccount(this.idAccount).subscribe(
        (data) => {
          this.profileViewMember = data;
          console.log(this.profileViewMember);
          // console.log(this.employee);
        },
        () => {},
        () => {
          // console.log(this.member);
        }
      );
    });
  }

}
