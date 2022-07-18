import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ShowHomeComponent } from './show-home/show-home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { InstructionComponent } from './instruction/instruction.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


@NgModule({
  declarations: [ShowHomeComponent, ProductDetailComponent, ForgotPasswordComponent, HeaderComponent, FooterComponent, InstructionComponent, AboutUsComponent, ContactUsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
