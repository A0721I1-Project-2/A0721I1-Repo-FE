import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/Product';
import {ProductService} from '../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {max, min} from 'rxjs/operators';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  productList: Product[] = [];
  pageNumber = 0;
  totalPages: number;
  totalPagesArray: number[] = [];
  notFoundStatus = false;
  public searchProduct: FormGroup;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAll();
    this.searchProduct = this.fb.group({
      nameProduct: [''],
      typeProduct: [''],
      sellerName: [''],
      priceRange: [''],
      biddingStatus: ['']
    })
  }

  getAll() {
    this.productService.getAll(0).subscribe(productList => {
      if (productList !== null ) {
        this.productList = productList['content'];
        this.totalPages = productList['totalPages'];
        this.setPage(this.totalPages)
        console.log(productList);
      }
    })
  };

  search() {
    let minPrice: number;
    let maxPrice: number;

    switch (this.searchProduct.value.priceRange) {
      case "0 - 100 USD":
        minPrice = 0;
        maxPrice = 100;
        break;
      case "100 - 500 USD":
        minPrice = 100;
        maxPrice = 500;
        break;
      case "500 - 5,000 USD":
        minPrice = 500;
        maxPrice = 5000;
        break;
      case "5,000 - 50,000 USD":
        minPrice = 5000;
        maxPrice = 50000;
      case "Above 50,000 USD":
        minPrice = 50000;
        maxPrice = 1000000;
    }
    this.productService.searchByNameTypeSellerPriceStatus(this.searchProduct.value.nameProduct,
      this.searchProduct.value.typeProduct, this.searchProduct.value.sellerName,maxPrice,minPrice,
      this.searchProduct.value.biddingStatus,0).subscribe(productList => {
      if (productList == null) {
        this.notFoundStatus = true;
      } else {
        this.notFoundStatus = false;
        this.productList = productList['content'];
        this.setPage(this.totalPages);
        console.log(this.productList);
        console.log(maxPrice, minPrice);
      }
    })
  };

  nextPage() {
    if (this.pageNumber === this.totalPagesArray.length) {
      alert('Không thể chuyển qua trang sau!');
    } else {
      this.pageNumber += 1;
      this.showPage(this.pageNumber);
    }
  };

  previousPage() {
    if (this.pageNumber <= 0) {
      alert('Không thể chuyển qua trang trước!');
    } else {
      this.pageNumber -= 1;
      this.showPage(this.pageNumber);
    }
  };

  private setPage(totalPages: any) {
    this.totalPagesArray = new Array(totalPages);
  };

  changePageNumber(i: number) {
    this.pageNumber = i;
    this.showPage(this.pageNumber);
  };

  showPage(page: number) {
    this.productService.getAll(page).subscribe(productList => {
      if (productList !== null ) {
        this.productList = productList['content'];
        this.totalPages = productList['totalPages'];
        this.setPage(this.totalPages);
      }
    })
  }
}
