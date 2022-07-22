import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionProductRoutingModule } from './auction-product-routing.module';
import { PostProductComponent } from './post-product/post-product.component';
import { AuctionComponent } from './auction/auction.component';
<<<<<<< HEAD
=======
import {HttpClientModule} from '@angular/common/http';
>>>>>>> 52516eb1ca37b9e414e598bb404dfb0694fa3196
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [PostProductComponent, AuctionComponent],
<<<<<<< HEAD
  imports: [
    CommonModule,
    AuctionProductRoutingModule,
    ReactiveFormsModule
  ]
=======
    imports: [
        CommonModule,
        AuctionProductRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ]
>>>>>>> 52516eb1ca37b9e414e598bb404dfb0694fa3196
})
export class AuctionProductModule { }
