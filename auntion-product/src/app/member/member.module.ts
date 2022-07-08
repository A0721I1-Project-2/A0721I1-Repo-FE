import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { ListMemberComponent } from './list-member/list-member.component';
import { SignUpMemberComponent } from './sign-up-member/sign-up-member.component';


@NgModule({
  declarations: [ListMemberComponent, SignUpMemberComponent],
  imports: [
    CommonModule,
    MemberRoutingModule
  ]
})
export class MemberModule { }
