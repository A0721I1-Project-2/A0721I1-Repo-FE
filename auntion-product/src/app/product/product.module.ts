import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { StatisticComponent } from './statistic/statistic.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ReviewProductComponent } from './review-product/review-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';


@NgModule({
  declarations: [StatisticComponent, ListProductComponent, ReviewProductComponent, EditProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
