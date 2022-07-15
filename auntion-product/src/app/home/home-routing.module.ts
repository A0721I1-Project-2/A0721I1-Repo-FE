import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowHomeComponent} from './show-home/show-home.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {InstructionComponent} from './instruction/instruction.component';


const routes: Routes = [
  {
    path: 'show-home',
    component: ShowHomeComponent
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'instruction',
    component: InstructionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
