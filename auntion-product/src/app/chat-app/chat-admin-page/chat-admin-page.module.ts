import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatAdminPageRoutingModule } from './chat-admin-page-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import { ChatAdminHomeComponent } from './chat-admin-home/chat-admin-home.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [UserListComponent, ChatBoxComponent, ChatFormComponent, ChatAdminHomeComponent],
    imports: [
        CommonModule,
        ChatAdminPageRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        ReactiveFormsModule
    ]
})
export class ChatAdminPageModule { }
