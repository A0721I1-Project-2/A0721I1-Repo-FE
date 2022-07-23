import {Component, Inject, OnInit} from '@angular/core';
import {Product} from '../../model/Product';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {TypeProduct} from '../../model/TypeProduct';
import {ImageProduct} from '../../model/ImageProduct';
import {finalize} from 'rxjs/operators';
import {Member} from '../../model/Member';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: Product;
  typeProduct: TypeProduct[];
  imageProduct: ImageProduct[];
  member: Member[];
  selectedImage: any;
  submitted = false;

  imgVip1 = 'https://firebasestorage.googleapis.com/v0/b/sprint2-1452b.appspot.com/o/david-van-dijk-3LTht2nxd34-unsplash.jpg?alt=media&token=d942e43a-9263-471a-9f8a-baae85f8badc';

  editForm: FormGroup | any;
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }


  ngOnInit(): void {
    this.getTypeProduct();
    this.getProduct();
  }

  getProduct(){
    this.activatedRoute.paramMap.subscribe((paraMap: ParamMap) => {
      const id = 1;
      // const id = Number(paraMap.get('id'));
      this.productService.findById(id).subscribe(
        next => {
          this.product = next;
          console.log(this.product);
          this.imageProduct =  next.imageProductList;
          console.log(this.imageProduct);
          this.editForm.patchValue({
            idProduct: this.product.idProduct,
            codeProduct:   this.product.codeProduct,
            createDay :  this.product.createDay,
            finalPrice: this.product.finalPrice,
            flagDelete: this.product.flagDelete,
            remainingTime: this.product.remainingTime,
            approvalStatus: this.product.approvalStatus,
            biddingStatus: this.product.biddingStatus,
            cart: this.product.cart,
            nameProduct: this.product.nameProduct,
            idMember: this.product.members.idMember,
            nameMember: this.product.members.nameMember,
            typeProduct: this.product.typeProduct,
            imageProduct: this.product.imageProductList.imageProduct,
            initialPrice: this.product.initialPrice,
            incrementPrice: this.product.incrementPrice,
            startDate: this.product.startDate,
            endDate: this.product.endDate,
            productDescription: this.product.productDescription,
          });
        });
    });
    this.editForm = this.fb.group({
      idProduct: [this.product.idProduct, Validators.required],
      codeProduct: ['', Validators.required],
      createDay: ['', Validators.required],
      finalPrice: ['', Validators.required],
      flagDelete: ['', Validators.required],
      remainingTime: ['', Validators.required],
      approvalStatus: ['', Validators.required],
      biddingStatus: ['', Validators.required],
      cart: ['', Validators.required],
      nameProduct: ['', Validators.required],
      idMember: ['', Validators.required],
      nameMember: ['', Validators.required],
      typeProduct: ['', Validators.required],
      imageProduct: ['', Validators.required],
      initialPrice: ['', Validators.required],
      incrementPrice: ['', Validators.required],
      imgProduct: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      productDescription: ['', Validators.required]
    });
  }

  getAll() {
    this.getTypeProduct();
    this.getImageProduct();
    this.getProduct();
  }

  getTypeProduct() {
    this.productService.findType().subscribe((data => {
      this.typeProduct = data;
      console.log(this.typeProduct);
    }));
  }


  getImageProduct(){
    this.productService.findImage().subscribe((data => {
      this.imageProduct = data;
      console.log(this.imageProduct);
    }));
  }

  onSubmit() {
    // if (this.selectedImage == null) {
    //   const nameImg = '/A0721I1-' + this.selectedImage.name;
    //   const fileRef = this.storage.ref(nameImg);
    //   this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
    //     finalize(() => {
    //       fileRef.getDownloadURL().subscribe((url) => {
    //         this.editForm.patchValue({imageProduct: url});
    //         this.product = this.editForm.value;
    //         console.log(this.product);
    //         this.productService.findByIdMember(this.product.members.idMember).subscribe(member => {
    //           this.product.members = member;
    //           console.log(this.product);
    //           this.productService.updateProduct(this.product).subscribe(() => {
    //           });
    //         });
    //       });
    //     })
    //   ).subscribe();
    // }else {
    //   console.log('2');
    // }
    // this.editForm.patchValue({imageProduct: url});
    this.product = this.editForm.value;
    console.log(this.product);
    this.productService.findByIdMember(this.editForm.get('idMember').value).subscribe(member => {
      this.product.members = member;
      console.log(this.product);
      this.productService.updateProduct(this.product).subscribe(() => {
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

  preview(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = e => {
      console.log(e);
      this.imgVip1 = reader.result as string;
    };

  }
}
