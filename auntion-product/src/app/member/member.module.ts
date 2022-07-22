import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberRoutingModule } from './member-routing.module';
import { SignUpMemberComponent } from './sign-up-member/sign-up-member.component';
import { ProfileMemberComponent } from './profile-member/profile-member.component';
import { EditMemberComponent } from './edit-member/edit-member.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ReactiveFormsModule} from '@angular/forms';
import {ListMemberComponent} from './list-member/list-member.component';
import {AdminModule} from '../admin/admin.module';


@NgModule({
  declarations: [ SignUpMemberComponent, ProfileMemberComponent, EditMemberComponent, ListMemberComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    AdminModule
  ]
})
export class MemberModule { }
