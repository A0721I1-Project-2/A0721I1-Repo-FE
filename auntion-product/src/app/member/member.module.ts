
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MemberRoutingModule} from './member-routing.module';
import {ListMemberComponent} from './list-member/list-member.component';
import {SignUpMemberComponent} from './sign-up-member/sign-up-member.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxCaptchaModule} from 'ngx-captcha';
// @ts-ignore
import { ProfileMemberComponent } from './profile-member/profile-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';

import {NgxPaginationModule} from 'ngx-pagination';




@NgModule({
  declarations: [ListMemberComponent, SignUpMemberComponent, ProfileMemberComponent, EditMemberComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class MemberModule {
}
