import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionProductRoutingModule } from './auction-product-routing.module';
import { PostProductComponent } from './post-product/post-product.component';
import { AuctionComponent } from './auction/auction.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [PostProductComponent, AuctionComponent],
  imports: [
    CommonModule,
    AuctionProductRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuctionProductModule { }
