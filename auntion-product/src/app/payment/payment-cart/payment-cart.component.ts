import {Component, OnInit} from '@angular/core';
import {PaymentService} from '../service/payment.service';
import {Address} from './address';
import {Districts} from './districts';
import {Ward} from './ward';
import {Product} from '../../model/Product';
import {Member} from '../../model/Member';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Transport} from '../../model/Transport';
import {PaymentMethod} from '../../model/PaymentMethod';
import {Cart} from '../../model/Cart';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-cart',
  templateUrl: './payment-cart.component.html',
  styleUrls: ['./payment-cart.component.css']
})
export class PaymentCartComponent implements OnInit {

  // Cac bien chua thanh pho, quan, huyen
  addressList: Address[];
  districtList: Districts[];
  wardList: Ward[];

  // Bien chua san pham
  products: Product[];
  member: Member;
  payment: FormGroup;
  transport: Transport;
  paymentMethod: PaymentMethod;
  cart: Cart;
  idMember = 5;
  product: Product[] = [];

  // Cac bien chua tong tien, phu phi
  subPrice = 0;
  fee = 0;
  total = 0;
  firstName: string;
  lastName: string;
  message: string;
  link: string;

  constructor(
    private service: PaymentService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('testObject') != null){
      this.message = '';
      this.message = sessionStorage.getItem('message-fail');
      document.getElementById('alert').hidden = false;
        }
    sessionStorage.removeItem('testObject');
    sessionStorage.removeItem('message');
    // Phuong thuc lay ra member
    this.service.getMember(this.idMember).subscribe(data => {
      this.member = data;
      console.log(data);
      this.getInfo(data.nameMember);
      this.payment.patchValue({
        member: this.member,
        firstNameReceiver: this.firstName,
        lastNameReceiver: this.lastName,
        emailReceiver: this.member.emailMember,
        phoneReceiver: this.member.phoneMember
      });
    }, error => {
      console.log('err');
    });

    this.service.getPaymentMethod().subscribe(data => {
      this.paymentMethod = data[0];
      console.log(this.paymentMethod);
    }, error => {
      console.log('err');
    });

    this.payment = new FormGroup(
      {
        idPayment: new FormControl(''),
        firstNameReceiver: new FormControl('', [Validators.pattern('^[a-z,A-Z ,ỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]{1,}$'), Validators.required]),
        lastNameReceiver: new FormControl('', [Validators.pattern('^[a-z,A-Z ,ỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]{1,}$'), Validators.required]),
        addressReceiver: new FormControl('', [Validators.required]),
        emailReceiver: new FormControl('', [Validators.pattern('^[A-Za-z0-9+_.-]+@gmail.com$'), Validators.required]),
        phoneReceiver: new FormControl('', [Validators.pattern('^[0-9 -]{1,}$'), Validators.required]),
        feeService: new FormControl(''),
        city: new FormControl('', [Validators.required]),
        district: new FormControl('', [Validators.required]),
        ward: new FormControl('', [Validators.required]),
        descriptionReceiver: new FormControl(''),
        member: new FormControl(''),
        paymentMethod: new FormControl(''),
        transport: new FormControl(''),
        cart: new FormControl(''),
        product: new FormControl('', [Validators.required]),
        total: new FormControl(''),
      }
    );

    // Phuong thuc lay ra tinh thanh pho
    this.service.getAddress().subscribe(data => {
      this.addressList = data;
      console.log(data.length);
    }, error => {
      console.log('err');
    });

    // Phuong thuc lay ra danh sach san pham
    this.service.getProduct(this.idMember).subscribe(data => {
      this.products = data;
      this.fee = 1;
      this.total = 0;
      this.subPrice = 0;
      this.fee = this.fee * this.products.length;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.products.length; i++) {
        this.subPrice += this.products[i].finalPrice;
        this.product.push(this.products[i]);
        console.log("product")
      }
      this.total = this.subPrice + this.fee;
    }, error => {
      console.log('err');
    });

    // Phuong thuc lay transport
    this.service.getTransport().subscribe(data => {
      this.transport = data[0];
      console.log(this.transport);
    }, error => {
      console.log('err');
    });

    // Phuong thuc lay cart
    this.service.getCart(this.idMember).subscribe(data => {
      this.cart = data;
    }, error => {
      console.log('err');
    });
    // this.setMethod();
  }

  // Phuong thuc lay ra quan huyen khi chon thanh pho
  setDistricts() {
    for (let i = 0; i < this.addressList.length; i++) {
      if (this.addressList[i].Name === (document.getElementById('city') as HTMLInputElement).value) {
        this.districtList = this.addressList[i].Districts;
      }
    }
  }

  // Phuong thuc lay ra phuong xa khi chon quan huyen
  setWards() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.districtList.length; i++) {
      if (this.districtList[i].Name === (document.getElementById('district') as HTMLInputElement).value) {
        this.wardList = this.districtList[i].Wards;
        break;
      }
    }
  }

  // Cac phuong thuc chon phuong thuc than toan
  // setMethod() {
  //   document.getElementById('paypal').hidden = false;
  //   document.getElementById('cod').hidden = true;
  //   (document.getElementById('paypal-btn') as HTMLInputElement).classList.add('selected');
  //   document.getElementById('cod-btn').classList.remove('selected');
  //   this.service.getPaymentMethod().subscribe(data => {
  //     this.paymentMethod = data[0];
  //     console.log(this.paymentMethod);
  //   }, error => {
  //     console.log('err');
  //   });
  // }
  //
  // setMethod1() {
  //   document.getElementById('paypal').hidden = true;
  //   document.getElementById('cod').hidden = false;
  //   (document.getElementById('cod-btn') as HTMLInputElement).classList.add('selected');
  //   document.getElementById('paypal-btn').classList.remove('selected');
  //   this.service.getPaymentMethod().subscribe(data => {
  //     this.paymentMethod = data[1];
  //   }, error => {
  //     console.log('err');
  //   });
  // }

  // Phuong thuc tinh tong tien khi chon san pham thanh toan
  setTotal(idProduct: number) {
    if ((document.getElementById(String(idProduct)) as HTMLInputElement).checked === true) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].idProduct === idProduct) {
          this.product.push(this.products[i]);
          this.subPrice = this.subPrice + this.products[i].finalPrice;
          this.fee = this.fee + 1;
          this.total = this.subPrice + this.fee;
          break;
        }
      }
    } else {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].idProduct === idProduct) {
          for (let j = 0; j < this.product.length; j++) {
            if (this.product[j].idProduct === idProduct) {
              this.product[j] = this.product[j + 1];
              for (let m = j + 1; m < this.product.length; m++) {
                this.product[m] = this.product[m + 1];
              }
            }
            this.product.pop();
            break;
          }
          this.subPrice = this.subPrice - this.products[i].finalPrice;
          this.fee = this.fee - 1;
          this.total = this.subPrice + this.fee;
          break;
        }
      }
    }
    console.log(this.product);
  }

// Phuong thuc lay ra firstName lastName
  getInfo(name: string) {
    for (let i = 0; i < name.length; i++) {
      if (name[i] === ' ') {
        this.firstName = name.substring(0, i);
        this.lastName = name.substring(i + 1);
        break;
      }
    }
  }

  // Phuong thuc khi thanh toan
  submit1() {
    sessionStorage.setItem('message-fail', 'Payment failed!');
    this.payment.patchValue(
      {
        feeService: this.fee,
        // tslint:disable-next-line:max-line-length
        transport: this.transport,
        paymentMethod: this.paymentMethod,
        cart: this.cart,
        total: this.total,
        product: this.product
      }
    );
    console.log(this.payment.value);
    if (this.payment.invalid || (document.getElementById('check-pay') as HTMLInputElement).checked === false) {
      this.message = '';
      this.message = 'Please fill in the information correctly and completely';
      document.getElementById('alert').hidden = false;
    } else {
      // if (document.getElementById('paypal').hidden === true) {
      //   this.service.savePayment(this.payment.value).subscribe(data => {
      //     console.log('OK COD');
      //     sessionStorage.setItem('message', 'Complete your order');
      //     this.router.navigateByUrl('/home/show-home');
      //   }, error => {
      //     console.log('ERR COD');
      //   });
      // } else {
        document.getElementById('button-load').click();
        this.service.createPayment(this.payment.value).subscribe(data => {
          this.link = data;
          window.open(this.link, '_parent');
          sessionStorage.setItem('testObject', JSON.stringify(this.payment.value));
          sessionStorage.setItem('message', 'Payment success ');
        }, error => {
          console.log('NOT OK');
        });
      // }
    }
  }

  // Phuong thuc an thong bao
  hide() {
    document.getElementById('alert').hidden = true;
  }
}
