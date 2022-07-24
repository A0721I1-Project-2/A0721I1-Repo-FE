import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PostProductComponent} from './post-product/post-product.component';
import {AuctionComponent} from './auction/auction.component';


const routes: Routes = [
  {
    path: 'post-product',
    component: PostProductComponent
  },
  {
    // path: 'auction',
    path: 'auction/:id',
    component: AuctionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionProductRoutingModule { }
