import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StatisticComponent} from './statistic/statistic.component';
import {ListProductComponent} from './list-product/list-product.component';
import {ReviewProductComponent} from './review-product/review-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import { CreateProductComponent } from './create-product/create-product.component';


const routes: Routes = [
  {
    path: 'statistic',
    component: StatisticComponent
  },
  {
    path: 'list',
    component: ListProductComponent
  },
  {
    path: 'review',
    component: ReviewProductComponent
  },
  {
    path: 'edit',
    component: EditProductComponent
  },
  {
    path: 'create',
    component: CreateProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
