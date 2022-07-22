import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';

/* Moi người điền link mình tại đây */
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }, {
    path: 'chat-page',
    loadChildren: () => import('./chat-admin/chat-admin.module').then(module => module.ChatAdminModule)
  }, {
    path: 'product',
    loadChildren: () => import('../product/product.module').then(module => module.ProductModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
