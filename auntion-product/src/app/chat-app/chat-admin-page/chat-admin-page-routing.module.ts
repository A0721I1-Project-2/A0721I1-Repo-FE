import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatBoxComponent} from './chat-box/chat-box.component';
import {ChatAdminHomeComponent} from './chat-admin-home/chat-admin-home.component';


const routes: Routes = [
  {path: 'chat-page' , component: ChatAdminHomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatAdminPageRoutingModule { }
