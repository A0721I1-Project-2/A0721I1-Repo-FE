import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatAdminPageRoutingModule } from './chat-admin-page-routing.module';
import { UserItemComponent } from './user-item/user-item.component';
import { UserListComponent } from './user-list/user-list.component';
import { RoomChatComponent } from './room-chat/room-chat.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';


@NgModule({
  declarations: [UserItemComponent, UserListComponent, RoomChatComponent, ChatBoxComponent, ChatFormComponent],
  imports: [
    CommonModule,
    ChatAdminPageRoutingModule ,
    AngularFireModule.initializeApp(environment.firebase)
  ]
})
export class ChatAdminPageModule { }
