import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeAdminComponent} from './home-admin/home-admin.component';
import {Error500Component} from './error500/error500.component';


const routes: Routes = [
  {path: 'admin-home', component: HomeAdminComponent},
  {path: 'error-500', component: Error500Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlAdminPageRoutingModule {
}
