import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ControlAdminPageRoutingModule} from './control-admin-page-routing.module';
import {HeaderAdminComponent} from './header-admin/header-admin.component';
import {NavbarAdminComponent} from './navbar-admin/navbar-admin.component';
import {FooterAdminComponent} from './footer-admin/footer-admin.component';
import {HomeAdminComponent} from './home-admin/home-admin.component';
import {ContentAdminComponent} from './content-admin/content-admin.component';
import * as CanvasJSAngularChart from '../../assets/canvasjs.angular.component';

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [HeaderAdminComponent, NavbarAdminComponent, FooterAdminComponent, HomeAdminComponent, ContentAdminComponent,
    CanvasJSChart],
  imports: [
    CommonModule,
    ControlAdminPageRoutingModule
  ]
})
export class ControlAdminPageModule {
}
