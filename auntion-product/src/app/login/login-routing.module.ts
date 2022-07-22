import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {LoginFormComponent} from "./login-form/login-form.component";



const routes: Routes = [ {
  path: 'authentication',
  component: LoginComponent
},
{path: '' , 
component: LoginFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
