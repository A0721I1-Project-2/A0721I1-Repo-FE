import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListProductComponent} from './list-product/list-product.component';
import {ReviewProductComponent} from './review-product/review-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {CreateProductComponent} from './create-product/create-product.component';
import {StatisticComponent} from './statistic/statistic.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListProductComponent
  },
  {
    path: 'review/:id',
    component: ReviewProductComponent
  },
  {
    path: 'edit/:id',
    component: EditProductComponent
  },
  {
    path: 'create',
    component: CreateProductComponent
  },
  {
    path: 'statistic',
    component: StatisticComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
