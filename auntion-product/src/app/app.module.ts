import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxCaptchaModule } from "ngx-captcha";
import { ToastrModule } from "ngx-toastr";
import { TransactionModule } from "./admin/transaction/transaction.module";
import { ChatUserPageModule } from "./chat-app/chat-user-page/chat-user-page.module";
import { DatePipe } from "@angular/common";
import { HomeModule } from "./home/home.module";

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
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    NgxCaptchaModule,
    ToastrModule.forRoot({
      // positionClass: 'toast-top-right',
      // positionClass: 'inline',
      timeOut: 1500,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true
    }),
    TransactionModule,
    ChatUserPageModule,
    HomeModule,
  ],

  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
