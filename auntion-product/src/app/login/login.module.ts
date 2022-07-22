import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';

import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [LoginComponent,LoginFormComponent],
    exports: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule
    ]
})
export class LoginModule { }
