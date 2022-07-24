import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatBoxUserComponent} from "./chat-box-user/chat-box-user.component";
import {RoomChatUserComponent} from "./room-chat-user/room-chat-user.component";
import {ChatFormUserComponent} from "./chat-form-user/chat-form-user.component";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [ChatBoxUserComponent, ChatFormUserComponent, RoomChatUserComponent],
  exports: [
    ChatBoxUserComponent,
    RoomChatUserComponent
  ],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule
  ]
})
export class ChatUserPageModule { }