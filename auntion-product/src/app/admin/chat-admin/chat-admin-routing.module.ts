import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatAdminHomeComponent} from './chat-admin-home/chat-admin-home.component';


const routes: Routes = [
  {path: '' , component: ChatAdminHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatAdminRoutingModule { }
