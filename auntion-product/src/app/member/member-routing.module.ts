import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignUpMemberComponent} from './sign-up-member/sign-up-member.component';
import {ProfileMemberComponent} from './profile-member/profile-member.component';
import {EditMemberComponent} from './edit-member/edit-member.component';
import {ListMemberComponent} from './list-member/list-member.component';


const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpMemberComponent
  },
  {
    path: 'profile/:id',
    component: ProfileMemberComponent
  },
  {
    path: 'profile',
    component: ProfileMemberComponent
  },
  {
    path: 'edit/:id',
    component: EditMemberComponent
  },
  {
    path: 'list',
    component: ListMemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
