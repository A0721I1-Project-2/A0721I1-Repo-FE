import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatAdminRoutingModule} from './chat-admin-routing.module';
import {AdminModule} from '../admin.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {HttpClientModule} from '@angular/common/http';
import {ChatAdminHomeComponent} from './chat-admin-home/chat-admin-home.component';
import {ChatBoxAdminComponent} from './chat-box-admin/chat-box-admin.component';
import {ChatFormAdminComponent} from './chat-form-admin/chat-form-admin.component';
import {UserListComponent} from './user-list/user-list.component';
import {environment} from '../../chat-app/environments/environment';


@NgModule({
  declarations: [ChatAdminHomeComponent, ChatBoxAdminComponent, ChatFormAdminComponent, UserListComponent],
  imports: [
    CommonModule,
    ChatAdminRoutingModule,
    AdminModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ]
})
export class ChatAdminModule { }
