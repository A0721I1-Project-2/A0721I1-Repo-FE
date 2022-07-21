import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ShareService} from '../../login/service/share.service';
import swal from 'sweetalert';
import {Member} from '../../model/Member';
import {TokenStorageService} from '../../login/service/token-storage.service';
import {MemberService} from '../../member/service/member.service';
import {Role} from "../../model/Role";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  // employee: Employee;
  member: Member;
  // role: Role;
  idUser: number;
  isLogin = false;
  roles: [];
  username: string;
  token: string;


  constructor(
    public tokenStorageService: TokenStorageService,
    private router: Router,
    private memberService: MemberService,
    private shareService: ShareService,
  ) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.token = this.tokenStorageService.getUser().token;
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLogin = this.token != null;
    console.log(this.isLogin);
    console.log(this.token);
    this.getPositionById();
  }

  ngOnInit(): void {
    this.loadHeader();
  }

  logout() {
      swal({
      title: 'Đăng xuất',
      text: 'Bạn có chắc là muốn đăng xuất khỏi hệ thống không ?',
      icon: 'warning',
      buttons: ['Hủy', true],
      dangerMode: true,
    })
      .then((willSignOut) => {
        if (willSignOut) {
          swal('Bạn đã đăng xuất khỏi hệ thống', {
            icon: 'success',
          });
          setTimeout(() => {
            this.tokenStorageService.signOut();
            this.ngOnInit();
            this.router.navigateByUrl('/');
            setTimeout(() => {
              window.location.reload();
            }, 50);
          }, 700);
        } else {}
      });
    // if (window.confirm('Bạn có chắc là muốn đăng xuất ra khỏi hệ thống ?')){
    //   this.tokenStorageService.signOut();
    //   this.ngOnInit();
    // }
  }

  getPositionById() {
    if (this.tokenStorageService.getUser()){
      this.idUser = this.tokenStorageService.getUser().id;
      console.log(this.idUser);
      this.memberService.findByIdUser(this.idUser).subscribe(
        (data) => {
          this.member = data;
        }
      );
    }
  }
}
