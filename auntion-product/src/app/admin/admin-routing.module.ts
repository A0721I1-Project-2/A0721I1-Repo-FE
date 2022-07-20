import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Moi người điền link mình tại đây */
const routes: Routes = [
  {
    path: 'statistical-page',
    loadChildren: () => import('./statistical/statistical.module').then(module => module.StatisticalModule)
  },
  {
    path: 'chat-page',
    loadChildren: () => import('./chat-admin/chat-admin.module').then(module => module.ChatAdminModule)
  },
  {
    path: 'product-page',
    loadChildren: () => import('./product/product.module').then(module => module.ProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
