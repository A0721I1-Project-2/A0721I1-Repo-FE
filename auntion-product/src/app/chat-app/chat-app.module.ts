import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireModule} from '@angular/fire';
import {environment} from './environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user-item.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';

@NgModule({
  declarations: [UserListComponent, UserItemComponent, ChatBoxComponent],
  imports: [
    CommonModule ,
    AngularFireModule.initializeApp(environment.firebase) ,
    AngularFireDatabaseModule ,
    AngularFireStorageModule
  ]
})
export class ChatAppModule { }
