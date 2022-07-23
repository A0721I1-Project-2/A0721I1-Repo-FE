import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TransactionModule} from './transaction/transaction.module';
// @ts-ignore
import {NgxCaptchaModule} from 'ngx-captcha';
import {ChatUserPageModule} from './chat-app/chat-user-page/chat-user-page.module';
import {HomeModule} from './home/home.module';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxCaptchaModule,
    ToastrModule.forRoot({
      // positionClass: 'toast-top-right',
      // positionClass: 'inline',
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    TransactionModule,
    ChatUserPageModule,
    HomeModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
