import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RoleGuardService} from '../login/service/role-guard.service';

/* Moi người điền link mình tại đây */
const routes: Routes = [
  {
    path: 'dashboard', // HauLST thêm để tránh trùng link với trang chủ
    component: DashboardComponent,
    canActivate: [RoleGuardService]
  }, {
    path: 'chat-page',
    loadChildren: () => import('./chat-admin/chat-admin.module').then(module => module.ChatAdminModule),
    canActivate: [RoleGuardService]
  }, {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(module => module.ProductModule),
    canActivate: [RoleGuardService]
  },
  {
    path: 'member',
    loadChildren: () => import('../member/member.module').then(module => module.MemberModule),
    canActivate: [RoleGuardService]
  },
  {
    path: 'transaction',
    loadChildren: () => import('./transaction/transaction.module').then(module => module.TransactionModule),
    canActivate: [RoleGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
