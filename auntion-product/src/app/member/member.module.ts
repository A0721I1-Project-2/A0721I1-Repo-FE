import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { ListMemberComponent } from './list-member/list-member.component';
import { SignUpMemberComponent } from './sign-up-member/sign-up-member.component';
import { ProfileMemberComponent } from './profile-member/profile-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListMemberComponent, SignUpMemberComponent, ProfileMemberComponent, EditMemberComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    ReactiveFormsModule
  ]
})
export class MemberModule { }
