import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatAdminPageRoutingModule } from './chat-admin-page-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { RoomChatComponent } from './room-chat/room-chat.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { ChatAdminHomeComponent } from './chat-admin-home/chat-admin-home.component';


@NgModule({
  declarations: [UserListComponent, RoomChatComponent, ChatBoxComponent, ChatFormComponent, ChatAdminHomeComponent],
  imports: [
    CommonModule,
    ChatAdminPageRoutingModule ,
    AngularFireModule.initializeApp(environment.firebase)
  ]
})
export class ChatAdminPageModule { }
