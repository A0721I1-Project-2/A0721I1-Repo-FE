import { Component, OnInit } from '@angular/core';
import {AuctionProductService} from '../service/auction-product.service';
import {Product} from '../../model/Product';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  product: Product;
  currentPrice: number;
  currentWinner: string;

  constructor(private auctionProductService: AuctionProductService) { }

  ngOnInit(): void {
    this.getProductById(1);
  }

  getProductById(id: number) {
    this.auctionProductService.getProductById(id).subscribe((product: any) => {
      this.product = product;
      this.currentPrice = product.initialPrice;
    });
  }
}
