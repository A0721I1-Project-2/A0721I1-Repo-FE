import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../../model/Product';


@Component({
  selector: 'app-review-product',
  templateUrl: './review-product.component.html',
  styleUrls: ['./review-product.component.css']
})
export class ReviewProductComponent implements OnInit {

  // reviewProductForm: FormGroup;
  id: number;
  product: Product;

  constructor(private productService: ProductService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const hideNavHp = document.querySelector('#header');
    const hideFooterHp = document.querySelector('.footer__container');
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
    hideNavHp.style.display = 'none';
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
    hideFooterHp.style.display = 'none';
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = +paramMap.get('id');
      this.getProduct(this.id);
      console.log(this.id);
      console.log(this.getProduct(this.id));
    });
  }

  getProduct(id: number) {
    return this.productService.findByID(id).subscribe(product => {
      this.product = product;
      // this.reviewProductForm = this.fb.group( {
      //   idProduct: [product.idProduct],
      //   nameProduct: [product.nameProduct],
      //   sellerID: [product.member.idMember],
      //   sellerName: [product.member.nameMember],
      //   sellerEmail: [product.member.emailMember],
      //   nameProductType: [product.typeProduct.nameProductType],
      //   initialPrice: [product.initialPrice],
      //   incrementPrice: [product.incrementPrice],
      //   biddingStartTime: [product.startDate],
      //   biddingEndTime: [product.endDate],
      //   productDescription: [product.productDescription],
      //   approvalStatus: [product.approvalStatus.idApprovalStatus]
      // });
      // this.product = this.reviewProductForm.value;
      console.log(this.product);
    });
  }

  approveProduct() {
    this.product.approvalStatus.idApprovalStatus = 2;
    this.productService.updateProduct(this.product).subscribe(() => {
      this.router.navigateByUrl('/product/list').then(r => alert('Approved successfully!'));
    });
  }

  rejectProduct() {
    this.product.approvalStatus.idApprovalStatus = 3;
    this.productService.updateProduct(this.product).subscribe(() => {
      this.router.navigateByUrl('/product/list').then(r => alert('Feedback sent successfully!'));
    });
  }
}
