import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuctionProductRoutingModule } from './auction-product-routing.module';
import { PostProductComponent } from './post-product/post-product.component';
import { AuctionComponent } from './auction/auction.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [PostProductComponent, AuctionComponent],
  imports: [
      CommonModule,
      AuctionProductRoutingModule,
      HttpClientModule,
      ReactiveFormsModule
  ]
})
export class AuctionProductModule { }
