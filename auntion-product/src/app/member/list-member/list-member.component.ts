import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Member} from '../../model/Member';
import {Rank} from '../../model/Rank';
import {MemberService} from '../service/member.service';
// @ts-ignore
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-member',
  templateUrl: './list-member.component.html',
  styleUrls: ['./list-member.component.css']
})
export class ListMemberComponent implements OnInit {

  number: number;
  memberList: Member[] = [];
  memberListAction: Member[] = [];
  member: Member;
  rankList: Rank[] = [];
  rank: Rank;
  indexIdMember: number;
  searchForm: FormGroup;
  pageNumber = 0;
  totalPage: number[] = [];
  emptyForm = false;
  ids: number[] = [];
  accountList: Account[] = [];

  constructor(private service: MemberService
  ) {
    this.searchForm = new FormGroup({
      nameMember: new FormControl(''),
      addressMember: new FormControl(''),
      emailMember: new FormControl(''),
      phoneNumberMember: new FormControl(''),
      nameRankMember: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllRank();
    this.getAllAccount();
    // this.showMember(this.pageNumber);
    this.searchMember();
    this.searchForm = new FormGroup({
      nameMember: new FormControl(''),
      addressMember: new FormControl(''),
      emailMember: new FormControl(''),
      phoneNumberMember: new FormControl(''),
      nameRankMember: new FormControl(''),
    });
    const hideNavHp = document.querySelector('#header');
    const hideFooterHp = document.querySelector('.footer__container');
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
    hideNavHp.style.display = 'none';
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
    hideFooterHp.style.display = 'none';
  }

  showMember(page: number) {
    page = this.pageNumber;
    this.service.getMember(page).subscribe((data: any) => {
      this.memberList = data.content;
      this.setPage(data.totalPages);
    });
  }

  searchMember() {
    let nameMember = this.searchForm.value.nameMember;
    let emailMember = this.searchForm.value.emailMember;
    let phoneNumberMember = this.searchForm.value.phoneNumberMember;
    let nameRankMember = this.searchForm.value.nameRankMember;
    let addressMember = this.searchForm.value.addressMember;
    if (nameMember.trim() === '') {
      nameMember = 'null';
    }
    if (emailMember.trim() === '') {
      emailMember = 'null';
    }
    if (phoneNumberMember.trim() === '') {
      phoneNumberMember = 'null';
    }
    if (nameRankMember === '') {
      nameRankMember = 'null';
    }
    if (addressMember.trim() === '') {
      addressMember = 'null';
    }
    console.log(nameMember, emailMember, phoneNumberMember, nameRankMember, addressMember);
    if (nameMember === 'null' && emailMember === 'null' && phoneNumberMember === 'null'
      && nameRankMember === 'null' && addressMember === 'null') {
      this.emptyForm = true;
    }
    this.service.searchMember(nameMember, emailMember, phoneNumberMember,
      nameRankMember, addressMember, this.pageNumber).subscribe((data: any) => {
      this.memberList = data.content;
      this.setPage(data.totalPages);
      console.log(this.memberList);
    });
    // this.showMember(this.pageNumber);
  }

  getAllRank(){
    this.service.getRankMember().subscribe(data => {
      this.rankList = data;
    });
  }

  getAllAccount(){
    this.service.getAccount().subscribe(data => {
      this.accountList = data;
      // console.log(this.accountList);
    });
  }

  setPage(totalPage: number) {
    this.totalPage = new Array(totalPage);
  }

  changePageNumber(i: number) {
    this.pageNumber = i;
    this.showMember(this.pageNumber);
  }

  perviousPage() {
    if (this.pageNumber <= 0) {
      alert('Không thể chuyển qua trang trước!');
    } else {
      this.pageNumber -= 1;
      this.showMember(this.pageNumber);
    }
  }

  nextPage() {
    if (this.pageNumber === this.totalPage.length) {
      alert('Không thể chuyển qua trang sau!');
    } else {
      this.pageNumber += 1;
      this.showMember(this.pageNumber);
    }
  }

  onIdChanged(value: boolean , idMember: number) {
    if (value) {
      this.ids.push(idMember);
    } else {
      this.indexIdMember = this.ids.indexOf(idMember);
      this.ids.splice(this.indexIdMember, 1);
    }
  }

  blockMember() {
    if (this.ids.length === 0) {
      Swal.fire(
        'Haven\'t selected a member to block',
        '',
        'error'
      );
    } else {
      this.service.blockMember(this.ids).subscribe(data => {
        Swal.fire(
          'Block member success!',
          '',
          'success'
        );
        this.ids = [];
        this.ngOnInit();
      });
    }
  }

  unBlockMember() {
    if (this.ids.length === 0) {
      Swal.fire(
        'Haven\'t selected a member to unblock',
        '',
        'error'
      );
      console.log(this.ids);
    } else {
      this.service.unBlockMember(this.ids).subscribe(data => {
        Swal.fire(
          'Unblock member success!',
          '',
          'success'
        );
        this.ids = [];
        this.ngOnInit();
      });
    }
  }

  deleteMember() {
    if (this.ids.length === 0) {
      Swal.fire(
        'Haven\'t selected a member to delete',
        '',
        'error'
      );
    } else {
      this.service.deleteMember(this.ids).subscribe(data => {
        Swal.fire(
          'Block member success!',
          '',
          'success'
        );
        this.ids = [];
        this.ngOnInit();
      });
    }
  }
}
