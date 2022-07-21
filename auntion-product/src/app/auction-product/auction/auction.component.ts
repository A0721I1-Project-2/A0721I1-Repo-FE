import {Component, OnInit} from '@angular/core';
import {AuctionProductService} from '../service/auction-product.service';
import {Product} from '../../model/Product';
import {FormControl, FormGroup} from '@angular/forms';
import {AuctionDTO} from '../../model/auctionDTO';
import {Member} from '../../model/Member';
import {Account} from '../../model/Account';
import {ImageProduct} from '../../model/ImageProduct';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  idProduct: number;
  product: Product;
  isLoad = false;
  currentPrice: number;
  currentWinner: string;
  formAuction: FormGroup;
  arrayImage: string[] = [];
  auctionList: AuctionDTO[] = [];
  member: Member;
  account: Account;
  isFinish = false;

  constructor(private auctionProductService: AuctionProductService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const idProduct = this.activatedRoute.snapshot.params.id;
    this.idProduct = idProduct;
    this.getMemberAndAccountIdFromLocalStore();
    window.localStorage.setItem('id', '1');
    this.getAuctionList();
    this.formAuction = new FormGroup({
      currentBid: new FormControl()
    });

    const imagePromise = this.getImageByProductId(this.idProduct).toPromise();
    imagePromise.then((data) => {
      for (let i = 0; i < data.length; i++) {
        this.arrayImage[i] = data[i].imageProduct;
      }
      (document.getElementById('mainImage') as HTMLImageElement).src = this.arrayImage[0];
      document.getElementById('numbertext').innerText = '1/' + this.arrayImage.length;
    }, (error) => {
      console.log('Promise rejected with ' + JSON.stringify(error));
    });

    const productPromise = this.getProductById(this.idProduct).toPromise();
    productPromise.then((data) => {
      // tslint:disable-next-line:prefer-const
      let productTime;
      productTime = this.product = data;
      this.isLoad = true;
      if (data.finalPrice === null) {
        this.currentPrice = data.initialPrice;
        this.formAuction.patchValue({currentBid: data.initialPrice});
      } else {
        this.currentPrice = data.finalPrice;
        this.formAuction.patchValue({currentBid: data.finalPrice});
      }

      // (document.getElementById('mainImage') as HTMLImageElement).src = this.arrayImage[0];
      // document.getElementById('numbertext').innerText = '1/' + this.arrayImage.length;

      // Set the date we're counting down to
      const countDownDate = new Date(this.product.endDate).getTime();
      // Update the count down every 1 second
      // tslint:disable-next-line:only-arrow-functions
      const x = setInterval(function() {

        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        // document.getElementById('time-remain').innerHTML = days + 'd ' + hours + 'h '
        //   + minutes + 'm ' + seconds + 's ';
        productTime.remainingTime = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById('time-remain').innerHTML = 'Finished';
          document.getElementById('winner').innerHTML = 'Winner';
          document.getElementById('isFinish').click();
        }
      }, 1000);
    }, (error) => {
      console.log('Promise rejected with ' + JSON.stringify(error));
    });
  }

  getImageByProductId(id: number) {
    return this.auctionProductService.getImageByProductId(id);
  }

  getAuctionList() {
    const id = window.localStorage.getItem('id');
    this.auctionProductService.getAuctionList(Number(id)).subscribe((auctions: AuctionDTO[]) => {
      if (auctions != null) {
        this.auctionList = auctions;
        this.currentPrice = auctions[0].price;
        this.currentWinner = auctions[0].username;
      }
    });
  }

  getProductById(id: number) {
    return this.auctionProductService.getProductById(id);
  }

  auction() {
    const newPrice = Number((document.getElementById('price') as HTMLInputElement).value);
    document.getElementById('modal-head').innerText = 'Auction Alert';
    if (this.isFinish === true) {
      document.getElementById('modal-body').innerText = 'Auction of product ' + this.product.nameProduct + ' has finished!';
      document.getElementById('modal-header').style.background = 'red';
      document.getElementById('myModal').hidden = false;
      document.getElementById('myModal').click();
    } else if (newPrice <= this.currentPrice) {
      document.getElementById('modal-body').innerText = 'Auction Price must be greater than the Current Bid!';
      document.getElementById('modal-header').style.background = 'red';
      document.getElementById('myModal').hidden = false;
      document.getElementById('myModal').click();
    } else if (newPrice % this.product.incrementPrice !== 0) {
      document.getElementById('modal-body').innerText = 'Auction Price must be divisible by the Price Step!';
      document.getElementById('modal-header').style.background = 'red';
      document.getElementById('myModal').hidden = false;
      document.getElementById('myModal').click();
    } else {
      let currenDate;
      let currenDateTime;
      currenDate = new Date();
      currenDateTime = `${
        currenDate.getFullYear().toString().padStart(4, '0')}/${
        (currenDate.getMonth() + 1).toString().padStart(2, '0')}/${
        currenDate.getDate().toString().padStart(2, '0')} ${
        currenDate.getHours().toString().padStart(2, '0')}:${
        currenDate.getMinutes().toString().padStart(2, '0')}:${
        currenDate.getSeconds().toString().padStart(2, '0')}`;

      this.currentWinner = this.account.username;
      this.currentPrice = newPrice;
      // @ts-ignore
      // tslint:disable-next-line:max-line-length
      const newAuction: AuctionDTO = {
        productId: this.product.idProduct,
        memberId: this.member.idMember,
        accountId: this.account.idAccount,
        bidder: this.member.nameMember,
        price: newPrice,
        username: this.account.username,
        time: currenDateTime
      };
      this.auctionProductService.createNewAuction(this.product.idProduct, newAuction).subscribe(() => {
        this.getAuctionList();
        document.getElementById('modal-body').innerText = 'You have auctioned a product ' + this.product.nameProduct + '!';
        document.getElementById('modal-header').style.background = '#11B683';
        document.getElementById('myModal').hidden = false;
        document.getElementById('myModal').click();
      }, err => {
        console.log('err');
        console.log(err.error.message);
      });
    }
  }

  nextImage() {
    const mainImage = document.getElementById('mainImage') as HTMLImageElement;
    let image = '';
    let numberText;
    // tslint:disable-next-line:triple-equals
    if (mainImage.src.indexOf((this.arrayImage)[this.arrayImage.length - 1]) == -1) {
      for (let index = 0; index < this.arrayImage.length - 1; index++) {
        // tslint:disable-next-line:triple-equals
        if (mainImage.src.indexOf((this.arrayImage)[index]) != -1) {
          image = (this.arrayImage)[index + 1];
          numberText = index + 2;
          console.log(numberText);
          break;
        }
      }
      mainImage.src = image;
      document.getElementById('numbertext').innerText = numberText + '/' + this.arrayImage.length;
    } else {
      mainImage.src = (this.arrayImage)[0];
      document.getElementById('numbertext').innerText = 1 + '/' + this.arrayImage.length;
    }
  }

  prevImage() {
    const src = (document.getElementById('mainImage') as HTMLImageElement).src;
    let image = '';
    let numberText;
    // tslint:disable-next-line:triple-equals
    if (src.indexOf(this.arrayImage[0]) == -1) {
      for (let index = 1; index < this.arrayImage.length; index++) {
        // tslint:disable-next-line:triple-equals
        if (src.indexOf(this.arrayImage[index]) != -1) {
          image = this.arrayImage[index - 1];
          numberText = index;
          break;
        }
      }
      (document.getElementById('mainImage') as HTMLImageElement).src = image;
      document.getElementById('numbertext').innerText = numberText + '/' + this.arrayImage.length;
    } else {
      (document.getElementById('mainImage') as HTMLImageElement).src = this.arrayImage[this.arrayImage.length - 1];
      document.getElementById('numbertext').innerText = this.arrayImage.length + '/' + this.arrayImage.length;
    }
  }

  minusPrice() {
    const currentPrice = (document.getElementById('price') as HTMLInputElement).value;
    const price = Number(currentPrice) - this.product.incrementPrice;
    (document.getElementById('price') as HTMLInputElement).value = String(price);
  }

  plusPrice() {
    const currentPrice = (document.getElementById('price') as HTMLInputElement).value;
    const price = Number(currentPrice) + this.product.incrementPrice;
    (document.getElementById('price') as HTMLInputElement).value = String(price);
  }

  changeSlide(index) {
    (document.getElementById('mainImage') as HTMLImageElement).src = this.arrayImage[index];
    document.getElementById('numbertext').innerText = (index + 1) + '/' + this.arrayImage.length;
  }

  hide() {
    document.getElementById('myModal').hidden = true;
  }

  getMemberAndAccountIdFromLocalStore() {
    const id = window.localStorage.getItem('id');
    const memberPromise = this.auctionProductService.getMemberById(Number(id)).toPromise();
    memberPromise.then((memberData) => {
      this.member = memberData;
      const accountPromise = this.auctionProductService.getAccountByMemberId(Number(id)).toPromise();
      accountPromise.then((accountData) => {
        this.account = accountData;
      });
    }, (error) => {
      console.log('Promise rejected with ' + JSON.stringify(error));
    });
  }

  auctionFinish() {
    const idMember = window.localStorage.getItem('id');
    console.log('idMember: ' + idMember);
    this.isFinish = true;
    this.auctionProductService.getAuctionList(this.product.idProduct).subscribe((data: AuctionDTO[]) => {
      console.log(data);
      console.log(idMember);
      if (data[0].memberId === Number(idMember)) {
        document.getElementById('modal-head').innerText = 'Auction Alert';
        document.getElementById('modal-body').innerText = 'You have successfully auctioned the product ' + this.product.nameProduct + '!';
        document.getElementById('modal-header').style.background = '#11B683';
        document.getElementById('myModal').hidden = false;
        document.getElementById('myModal').click();
      }
    });
  }
}
