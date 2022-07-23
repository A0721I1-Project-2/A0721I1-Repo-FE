import { CreateProductComponent } from './create-product/create-product.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {StatisticComponent} from './statistic/statistic.component';
import {ListProductComponent} from './list-product/list-product.component';
import {ReviewProductComponent} from './review-product/review-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AdminModule} from '../admin/admin.module';
import { CoreModule } from '../shared/core.module';


@NgModule({
  declarations: [StatisticComponent, ListProductComponent, ReviewProductComponent, EditProductComponent, CreateProductComponent],

  exports: [
    StatisticComponent
  ],

  imports: [
    CoreModule,
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
  ]
})
export class ProductModule {
}
