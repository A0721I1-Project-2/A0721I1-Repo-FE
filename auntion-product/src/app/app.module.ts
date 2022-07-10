import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { UserItemComponent } from './chat-app/chat-admin-page/user-item/user-item.component';
import { UserListComponent } from './chat-app/chat-admin-page/user-list/user-list.component';
import {ChatUserPageModule} from './chat-app/chat-user-page/chat-user-page.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ChatUserPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
