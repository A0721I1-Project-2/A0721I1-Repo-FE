import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { ListMemberComponent } from './list-member/list-member.component';
import { SignUpMemberComponent } from './sign-up-member/sign-up-member.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListMemberComponent, SignUpMemberComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class MemberModule { }
