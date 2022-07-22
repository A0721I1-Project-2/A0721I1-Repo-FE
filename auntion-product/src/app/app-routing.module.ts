import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: 'login' ,
    loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'auction-product',
    loadChildren: () => import('./auction-product/auction-product.module').then(module => module.AuctionProductModule)
  },
  {
    path: 'member',
    loadChildren: () => import('./member/member.module').then(module => module.MemberModule)
  },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then(module => module.TransactionModule)
  },
    {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then(module => module.PaymentModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(module => module.ProductModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
