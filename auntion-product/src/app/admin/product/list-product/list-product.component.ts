import { Component, OnInit } from '@angular/core';
import {Product} from '../../../model/Product';
import {ProductService} from '../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {max, min} from 'rxjs/operators';
import {consoleTestResultHandler} from 'tslint/lib/test';
import {TypeProduct} from '../../../model/TypeProduct';
import {BiddingStatus} from '../../../model/BiddingStatus';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  productList: Product[] = [];
  typeProductList: TypeProduct[] = [];
  biddingStatusList: BiddingStatus[] = [];
  pageNumber = 0;
  totalPages: number;
  totalPagesArray: number[] = [];
  notFoundStatus = false;
  public searchProduct: FormGroup;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    const hideNavHp = document.querySelector('#header');
    const hideFooterHp = document.querySelector('.footer__container');
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
    hideNavHp.style.display = 'none';
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
    hideFooterHp.style.display = 'none';
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
    this.productService.getAllProduct(0).subscribe(productList => {
      if (productList !== null ) {
        this.productList = productList['content'];
        this.totalPages = productList['totalPages'];
        this.setPage(this.totalPages)
        console.log(productList);
      } else {
        this.notFoundStatus = true;
      }
    });
    this.productService.getAllTypeProduct().subscribe(typeProductList => {
      this.typeProductList = typeProductList;
    });
    this.productService.getAllBiddingStatus().subscribe(biddingStatusList => {
      this.biddingStatusList = biddingStatusList;
    })
  };

  search() {
    // this.searchProduct.value.nameProduct,
    //   this.searchProduct.value.typeProduct, this.searchProduct.value.sellerName,maxPrice,minPrice,
    //   this.searchProduct.value.biddingStatus

    if(this.searchProduct.value.nameProduct === "") {
      this.searchProduct.value.nameProduct = 'null';
    };

    if (this.searchProduct.value.typeProduct === "") {
      this.searchProduct.value.typeProduct = 'null'
    };

    if (this.searchProduct.value.sellerName === "") {
      this.searchProduct.value.sellerName = 'null'
    };

    if (this.searchProduct.value.biddingStatus === "") {
      this.searchProduct.value.biddingStatus = 'null'
    };

    if (this.searchProduct.value.priceRange === "") {
      this.searchProduct.value.priceRange = 'null'
    };

    let minPrice: string;
    let maxPrice: string;

    switch (this.searchProduct.value.priceRange) {
      case "0 - 100 USD":
        minPrice = "0";
        maxPrice = "100";
        break;
      case "100 - 500 USD":
        minPrice = "100";
        maxPrice = "500";
        break;
      case "500 - 5,000 USD":
        minPrice = "500";
        maxPrice = "5000";
        break;
      case "5,000 - 50,000 USD":
        minPrice = "5000";
        maxPrice = "50000";
        break;
      case "Above 50,000 USD":
        minPrice = "50000";
        maxPrice = "1000000";
        break;
      default:
        minPrice = 'null';
        maxPrice = 'null';
    }

    this.productService.searchByNameTypeSellerPriceStatus(this.searchProduct.value.nameProduct,
      this.searchProduct.value.typeProduct, this.searchProduct.value.sellerName,maxPrice,minPrice,
      this.searchProduct.value.biddingStatus,0).subscribe(productList => {
      if (productList == null) {
        this.notFoundStatus = true;
      } else {
        this.notFoundStatus = false;
        this.productList = productList['content'];
        this.totalPages = productList['totalPages'];
        this.setPage(this.totalPages);
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
    this.productService.getAllProduct(page).subscribe(productList => {
      if (productList !== null ) {
        this.productList = productList['content'];
        this.totalPages = productList['totalPages'];
        this.setPage(this.totalPages);
      }
    })
  }
}
