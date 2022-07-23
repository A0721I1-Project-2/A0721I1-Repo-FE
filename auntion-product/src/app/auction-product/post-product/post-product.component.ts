import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/Product';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

import {FirebaseService} from '../service/firebase.service';
import {AuctionProductService} from '../service/auction-product.service';
import {TypeProduct} from '../../model/TypeProduct';
import {FileUpload} from '../../model/FileUpload';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.css']
})
export class PostProductComponent implements OnInit {

  /* To store data from form */
  productCreate: Product;

  /* Form create */
  formCreate: FormGroup;
  typeProduct: TypeProduct[];
  /* To store url img */
  urls = [];
  selectedFiles: any;

  currentImageUpload: FileUpload;
  currentImagesUpload: File[] = [];

  constructor(private firebaseService: FirebaseService, private productService: AuctionProductService) {
  }

  VALIDATION_MESSAGE = {
    nameProduct: [
      {type: 'required', message: 'Product name cannot be blank !'}
    ],
    beginPrice: [
      {type: 'required', message: 'Begin Price cannot be blank !'},
      {type: 'pattern', message: 'Please enter the correct integer format !'}
    ],
    incrementPrice: [
      {type: 'required', message: 'Money For Once Auction cannot be blank !'},
      {type: 'pattern', message: 'Please enter the correct integer format !'}
    ],
    productDescription: [
      {type: 'required', message: 'Detail Information cannot be blank !'},
    ],
    typeProduct: [
      {type: 'required', message: 'Please select product type!'},
    ],
    startTime: [
      {type: 'required', message: 'Please select a date! '},
    ],
    endTime: [
      {type: 'required', message: 'Please select a date!'},
    ],
    image: [
      {type: 'required', message: 'Image cannot be blank !'},
    ],
  };

  ngOnInit(): void {
    // @ts-ignore
    this.formCreate = new FormGroup({
      nameProduct: new FormControl('', Validators.required),
      beginPrice: new FormControl('', Validators.required),
      incrementPrice: new FormControl('', Validators.required),
      productDescription: new FormControl('', Validators.required),
      typeProduct: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
      // image: new FormControl('', Validators.required)
    });
    // this.getControl.startTime.setValidators([Validators.required, this.customvValidateStartDate()]);
    // this.getControl.endTime.setValidators([Validators.required, this.customvValidateEnDate()]);
    this.productService.getAllTypeProduct().subscribe(data => {
      this.typeProduct = data;
      console.log(data);
    }, error => {
      console.log('errors');
    });
  }

  createProduct() {
    /* Get properties in form */
    this.productCreate = this.formCreate.value;
    if (this.formCreate.invalid) {
      return;
    } else {
      const typeProductId = this.formCreate.get('typeProduct').value;
      this.productService.getTypeProductById(typeProductId).subscribe(typeProduct => {
        this.productCreate.typeProduct = typeProduct;
        this.productService.createProduct(this.productCreate).subscribe(data => {
          /* Tránh lỗi vòng lặp */
          this.currentImagesUpload = [];
          /* Lấy và đẩy từng file vào 1 mảng */
          for (let i = 0; i < this.selectedFiles.length; i++) {
            console.log(this.selectedFiles.item(i));
            this.currentImagesUpload.push(this.selectedFiles.item(i));
          }

          /* push từng file */
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.currentImagesUpload.length; i++) {
            this.currentImageUpload = new FileUpload(this.currentImagesUpload[i]);

            /* Lưu trên firebase */
            this.firebaseService.pushImgToStorage(this.currentImageUpload, data);
          }
        });
      });
      Swal.fire(
        'The product is being approved!!',
        'You clicked the button!',
        'success'
      );
    }
  }

  preview(event: any) {
    /* To get info files selected */
    // this.selectedFiles = event.target.files;
    this.selectedFiles = event.target.files;
    /* To show images */
    this.urls = this.urls;
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  /* Getter properties form */
  get valueSelect() {
    return this.formCreate.controls;
  }

  private customvValidateEnDate(): ValidatorFn {
    return (form): ValidationErrors => {

      const endDate = form.value;
      const startDate = this.getControl.startDate.value;
      if (endDate < startDate) {
        return { invalid: true };
      }

      return null;
    };
  }

  private customvValidateStartDate(): ValidatorFn {
    return (form): ValidationErrors => {

      const startDate = form.value;
      const endDate = this.getControl.endDate.value;
      if (endDate < startDate) {
        return { invalid: true };
      }

      return null;
    };
  }

  showImage() {
  }
  public get getControl() {
    return this.formCreate.controls;
  }
}


