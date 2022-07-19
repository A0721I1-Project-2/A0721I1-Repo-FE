import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { StatisticComponent } from './statistic/statistic.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ReviewProductComponent } from './review-product/review-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import {ReactiveFormsModule} from '@angular/forms';
// import {CustomDatepipe} from './statistic/custom.datepipe';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
    declarations: [StatisticComponent, ListProductComponent, ReviewProductComponent, EditProductComponent],
    exports: [
        StatisticComponent
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ]
})
export class ProductModule { }
