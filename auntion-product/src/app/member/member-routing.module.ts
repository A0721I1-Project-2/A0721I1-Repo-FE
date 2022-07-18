import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListMemberComponent} from './list-member/list-member.component';
import {SignUpMemberComponent} from './sign-up-member/sign-up-member.component';


const routes: Routes = [
  {
    path: 'list',
    component: ListMemberComponent
  },
  {
    path: 'sign-up',
    component: SignUpMemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
