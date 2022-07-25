import {Component, OnInit} from '@angular/core';
import {Member} from '../../model/Member';
import {TokenStorageService} from '../../login/service/token-storage.service';
import {Router} from '@angular/router';
import {ShareService} from '../../login/service/share.service';
import {MemberService} from '../../member/service/member.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-header-unlogin',
    templateUrl: './header-unlogin.component.html',
    styleUrls: ['./header-unlogin.component.css']
})
export class HeaderUnloginComponent implements OnInit {

    // employee: Employee;
    member: Member;
    idUser: number;
    isLogin = false;
    roles: [];
    username: string;
    token: string;


    constructor(
        // private service: ProductService,
        public tokenStorageService: TokenStorageService,
        private router: Router,
        private toast: ToastrService,
        private memberService: MemberService,
        // private employeeService: EmployeeService,
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
    }

    ngOnInit(): void {
        this.loadHeader();
    }

    logout() {
        this.tokenStorageService.signOut();
        this.ngOnInit();
    }

}
