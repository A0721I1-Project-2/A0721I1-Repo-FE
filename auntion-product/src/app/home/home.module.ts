import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {ShowHomeComponent} from './show-home/show-home.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {InstructionComponent} from './instruction/instruction.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactUsComponent} from './contact-us/contact-us.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { HeaderUnloginComponent } from './header-unlogin/header-unlogin.component';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [ShowHomeComponent, ProductDetailComponent, ForgotPasswordComponent, HeaderComponent, FooterComponent, InstructionComponent, AboutUsComponent, ContactUsComponent, HeaderUnloginComponent],
    exports: [
        HeaderComponent,
        FooterComponent,
        HeaderUnloginComponent
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {
}
