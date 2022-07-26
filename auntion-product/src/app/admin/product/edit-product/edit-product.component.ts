import {Component, Inject, OnInit} from '@angular/core';
import {Product} from '../../../model/Product';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {TypeProduct} from '../../../model/TypeProduct';
import {ImageProduct} from '../../../model/ImageProduct';
import {finalize} from 'rxjs/operators';
import {Member} from '../../../model/Member';
import {MemberService} from '../../../member/service/member.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private memberService: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }
  public get getControl() {
    return this.editForm.controls;
  }

  product: Product;
  typeProduct: TypeProduct[];
  imageProduct: ImageProduct;
  member: Member[];
  selectedImage: any;
  submitted = false;
  selectedFiles: any;
  imgVip1 = 'https://firebasestorage.googleapis.com/v0/b/sprint2-1452b.appspot.com/o/david-van-dijk-3LTht2nxd34-unsplash.jpg?alt=media&token=d942e43a-9263-471a-9f8a-baae85f8badc';

  editForm: FormGroup | any;
  poster: any;
  VALIDATION_MESSAGE = {
    endDate: [
      {type: 'required', message: 'Please select a date!'},
      {type: 'error', message1: 'The end date must be greater than the start date!'}
    ],
  };
  nameProductClear: any;
  initialPriceClear: any;
  incrementPriceClear: any;
  startDateClear: any;
  endDateClear: any;
  productDescriptionClear: any;
  urls = [];


  ngOnInit(): void {
    const hideNavHp = document.querySelector('#header');
    const hideFooterHp = document.querySelector('.footer__container');
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
    hideNavHp.style.display = 'none';
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
    hideFooterHp.style.display = 'none';
    this.getTypeProduct();
    this.getProduct();
  }

  getProduct() {
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = Number(paraMap.get('id'));
      this.productService.findById(id).subscribe(
        next => {
          this.product = next;
          console.log(this.product);
          this.imageProduct = next.imageProductList;
          console.log(this.imageProduct);
          this.editForm.patchValue({
            idProduct: this.product.idProduct,
            codeProduct: this.product.codeProduct,
            createDay: this.product.createDay,
            finalPrice: this.product.finalPrice,
            flagDelete: this.product.flagDelete,
            remainingTime: this.product.remainingTime,
            approvalStatus: this.product.approvalStatus,
            biddingStatus: this.product.biddingStatus,
            nameProduct: this.product.nameProduct,
            idMember: this.product.member.idMember,
            nameMember: this.product.member.nameMember,
            typeProduct: this.product.typeProduct,
            imageProduct: this.product.imageProductList.imageProduct,
            initialPrice: this.product.initialPrice,
            incrementPrice: this.product.incrementPrice,
            startDate: this.product.startDate,
            endDate: this.product.endDate,
            productDescription: this.product.productDescription,
          });
        },
        error => {
          console.log(error);
        });
    });
    this.editForm = this.fb.group({
      idProduct: ['', Validators.required],
      codeProduct: ['', Validators.required],
      createDay: ['', Validators.required],
      finalPrice: [''],
      flagDelete: [''],
      remainingTime: [''],
      approvalStatus: [''],
      biddingStatus: [''],
      nameProduct: ['', Validators.required],
      idMember: ['', Validators.required],
      nameMember: ['', Validators.required],
      typeProduct: ['', Validators.required],
      imageProduct: [''],
      initialPrice: ['', Validators.required],
      incrementPrice: ['', Validators.required],
      imgProduct: [''],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      productDescription: ['', Validators.required]
    });
    this.getControl.endDate.setValidators([this.customValidateEnDate()]);
  }

  getAll() {
    this.getTypeProduct();
    // this.getImageProduct();
    this.getProduct();
  }

  getTypeProduct() {
    this.productService.findType().subscribe((data => {
      this.typeProduct = data;
      console.log(this.typeProduct);
    }));
  }

  // getImageProduct(){
  //   this.productService.findImage().subscribe((data => {
  //     this.imageProduct = data;
  //     console.log(this.imageProduct);
  //   }));
  // }
  editProduct() {
    this.product = this.editForm.value;
    console.log(this.product);
    this.productService.findByIdMember(this.editForm.get('idMember').value).subscribe(member => {
      this.product.member = member;
      console.log(this.product);
      this.productService.editProduct(this.product).subscribe(() => {
        this.router.navigateByUrl('/product/list');
      });
    });
    this.submitted = true;
    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }
    console.log(this.editForm.value);
  }

  // preview(event: any) {
  //   this.selectedImage = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.selectedImage);
  //   reader.onload = e => {
  //     console.log(e);
  //     this.imgVip1 = reader.result as string;
  //   };
  //
  // }

  // preview(event: any) {
  //   for (let i = 0; i < 3; i++) {
  //     this.imgTest.push(event.target.files[i]);
  //     const reader = new FileReader();
  //     // reader.readAsDataURL(this.selectedImage);
  //     reader.readAsDataURL(this.imgTest[i]);
  //     reader.onload = e => {
  //       console.log(e);
  //       this.imgVip1[i] = reader.result as string;
  //     };
  //   }
  //   console.log(this.imgTest);
  //   // this.selectedImage = event.target.files[0];
  //   // console.log(this.selectedImage);
  //   // const reader = new FileReader();
  //   // // reader.readAsDataURL(this.selectedImage);
  //   //
  //   // reader.readAsDataURL(this.imgTest);
  //   // reader.onload = e => {
  //   //   console.log(e);
  //   //   this.imgVip1 = reader.result as string;
  //   // };
  // }
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

  private customValidateEnDate(): ValidatorFn {
    return (form): ValidationErrors => {
      const endDate = form.value;
      const startDate = this.getControl.startDate.value;
      if (endDate < startDate) {
        return {invalid: true};
      }
      return null;
    };
  }

  handleClear() {
    this.nameProductClear = ' ';
    this.initialPriceClear = ' ';
    this.incrementPriceClear = ' ';
    this.startDateClear = ' ';
    this.endDateClear = ' ';
    this.productDescriptionClear = ' ';
  }

  showImage() {

  }
}
