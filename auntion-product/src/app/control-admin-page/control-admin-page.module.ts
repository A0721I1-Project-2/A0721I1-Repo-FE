import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlAdminPageRoutingModule } from './control-admin-page-routing.module';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';


@NgModule({
    declarations: [HeaderAdminComponent, NavbarAdminComponent, FooterAdminComponent, HomeAdminComponent],
  exports: [
    HeaderAdminComponent,
    NavbarAdminComponent,
    FooterAdminComponent
  ],
    imports: [
        CommonModule,
        ControlAdminPageRoutingModule
    ]
})
export class ControlAdminPageModule { }
