import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { StatisticComponent } from './statistic/statistic.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ReviewProductComponent } from './review-product/review-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../shared/core.module';


@NgModule({
  declarations: [StatisticComponent, ListProductComponent, ReviewProductComponent, EditProductComponent, CreateProductComponent],
  imports: [
    CoreModule,
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProductModule { }
