import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';


@NgModule({
  declarations: [HeaderAdminComponent, NavbarAdminComponent, FooterAdminComponent],
  exports: [
    NavbarAdminComponent,
    HeaderAdminComponent,
    FooterAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
