import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ListProductComponent} from './list-product/list-product.component';
import {ReviewProductComponent} from './review-product/review-product.component';
import {EditProductComponent} from './edit-product/edit-product.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';




@NgModule({
  declarations: [ ListProductComponent, ReviewProductComponent, EditProductComponent],

  exports: [

  ],

  imports: [

    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

  ]
})
export class ProductModule {
}
