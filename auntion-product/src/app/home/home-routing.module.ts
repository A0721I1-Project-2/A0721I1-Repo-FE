import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowHomeComponent } from './show-home/show-home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { InstructionComponent } from './instruction/instruction.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {
    path: 'show-home',
    component: ShowHomeComponent
  },
  {
    path: 'product-detail',
    component: ProductDetailComponent,
  },
  {
    path: '',
    component: ShowHomeComponent
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'instruction',
    component: InstructionComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'change-password/:token',
    component: ChangePasswordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
