import {Component, OnInit} from '@angular/core';
import {AuctionProductService} from '../service/auction-product.service';
import {Product} from '../../model/Product';
import {FormControl, FormGroup} from '@angular/forms';
import {AuctionDTO} from '../../model/auctionDTO';
import {Member} from '../../model/Member';
import {Account} from '../../model/Account';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.css']
})
export class AuctionComponent implements OnInit {
  idProduct: number;
  product: Product;
  isLoadProduct = false;
  isLoadImage = false;
  currentPrice: number;
  currentWinner: string;
  formAuction: FormGroup;
  arrayImage: string[] = [];
  auctionList: AuctionDTO[] = [];
  member: Member;
  account: Account;
  isFinish = false;
  mainImage: any;
  numberImage: any;
  modalBody: any;
  modalBackground: any;
  modalHidden = true;
  displayStyle = 'none';

  constructor(private auctionProductService: AuctionProductService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    window.localStorage.setItem('id', '1');
    const idProduct = this.activatedRoute.snapshot.params.id;
    this.idProduct = idProduct;
    this.getMemberAndAccountIdFromLocalStore();
    this.getAuctionList();
    this.formAuction = new FormGroup({
      currentBid: new FormControl()
    });

    const imagePromise = this.getImageByProductId(this.idProduct).toPromise();
    imagePromise.then((dataImage) => {
      console.log(dataImage);
      for (let i = 0; i < dataImage.length; i++) {
        this.arrayImage[i] = dataImage[i].imageProduct;
      }
      this.mainImage = dataImage[0].imageProduct;
      this.numberImage = '1/' + dataImage.length;
      this.isLoadImage = true;

      const productPromise = this.getProductById(this.idProduct).toPromise();
      productPromise.then((dataProduct) => {
        // tslint:disable-next-line:prefer-const
        let productTime;
        productTime = this.product = dataProduct;
        this.isLoadProduct = true;
        if (dataProduct.finalPrice === null) {
          this.currentPrice = dataProduct.initialPrice;
          this.formAuction.patchValue({currentBid: dataProduct.initialPrice});
        } else {
          this.currentPrice = dataProduct.finalPrice;
          this.formAuction.patchValue({currentBid: dataProduct.finalPrice});
        }

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

          productTime.remainingTime = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

          // If the count down is finished, write some text
          if (distance < 0) {
            clearInterval(x);
            productTime.remainingTime = 'Finished';
            document.getElementById('winner').innerText = 'Winner: ';
            document.getElementById('isFinish').click();
          }
        }, 1000);
      }, (error) => {
        console.log('Promise rejected with ' + JSON.stringify(error));
      });
    }, (error) => {
      console.log('Promise rejected with ' + JSON.stringify(error));
    });
  }

  getImageByProductId(id: number) {
    return this.auctionProductService.getImageByProductId(id);
  }

  getAuctionList() {
    this.auctionProductService.getAuctionList(this.idProduct).subscribe((auctions: AuctionDTO[]) => {
      if (auctions != null) {
        this.auctionList = auctions;
        this.currentPrice = auctions[0]?.price;
        this.currentWinner = auctions[0]?.username;
      }
    });
  }

  getProductById(id: number) {
    return this.auctionProductService.getProductById(id);
  }

  auction() {
    const newPrice = Number((document.getElementById('price') as HTMLInputElement).value);
    if (this.isFinish === true) {
      this.modalBody = 'Auction of product ' + this.product.nameProduct + ' has finished!';
      this.modalBackground = 'red';
      this.modalHidden = false;
      this.displayStyle = 'block';
    } else if (newPrice <= this.currentPrice) {
      this.modalBody = 'Auction Price must be greater than the Current Bid!';
      this.modalBackground = 'red';
      this.modalHidden = false;
      this.displayStyle = 'block';
    } else if (newPrice % this.product.incrementPrice !== 0) {
      this.modalBody = 'Auction Price must be divisible by the Price Step!';
      this.modalBackground = 'red';
      this.modalHidden = false;
      this.displayStyle = 'block';
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
        this.modalBody = 'You have auctioned a product ' + this.product.nameProduct + '!';
        this.modalBackground = '#11B683';
        this.modalHidden = false;
        this.displayStyle = 'block';
      }, err => {
        console.log('err');
        console.log(err.error.message);
      });
    }
  }

  nextImage() {
    let image = '';
    let numberText;
    // tslint:disable-next-line:triple-equals
    if (this.mainImage.indexOf((this.arrayImage)[this.arrayImage.length - 1]) == -1) {
      for (let index = 0; index < this.arrayImage.length - 1; index++) {
        // tslint:disable-next-line:triple-equals
        if (this.mainImage.indexOf((this.arrayImage)[index]) != -1) {
          image = (this.arrayImage)[index + 1];
          numberText = index + 2;
          break;
        }
      }
      this.mainImage = image;
      this.numberImage = numberText + '/' + this.arrayImage.length;
    } else {
      this.mainImage = this.arrayImage[0];
      this.numberImage = 1 + '/' + this.arrayImage.length;
    }
  }

  prevImage() {
    let image = '';
    let numberText;
    // tslint:disable-next-line:triple-equals
    if (this.mainImage.indexOf(this.arrayImage[0]) == -1) {
      for (let index = 1; index < this.arrayImage.length; index++) {
        // tslint:disable-next-line:triple-equals
        if (this.mainImage.indexOf(this.arrayImage[index]) != -1) {
          image = this.arrayImage[index - 1];
          numberText = index;
          break;
        }
      }
      this.mainImage = image;
      this.numberImage = numberText + '/' + this.arrayImage.length;
    } else {
      this.mainImage = this.arrayImage[this.arrayImage.length - 1];
      this.numberImage = this.arrayImage.length + '/' + this.arrayImage.length;
    }
  }

  plusPrice() {
    const currentPrice = (document.getElementById('price') as HTMLInputElement).value;
    const price = Number(currentPrice) + this.product.incrementPrice;
    (document.getElementById('price') as HTMLInputElement).value = String(price);
  }

  changeSlide(index) {
    this.mainImage = this.arrayImage[index];
    this.numberImage = (index + 1) + '/' + this.arrayImage.length;
  }

  hide() {
    this.modalHidden = true;
    this.displayStyle = 'none';
  }

  getMemberAndAccountIdFromLocalStore() {
    const id = window.localStorage.getItem('id');
    const memberPromise = this.auctionProductService.getMemberById(Number(id)).toPromise();
    memberPromise.then((memberData) => {
      this.member = memberData;
      this.account = memberData.account;
    }, (error) => {
      console.log('Promise rejected with ' + JSON.stringify(error));
    });
  }

  auctionFinish() {
    const idMember = window.localStorage.getItem('id');
    this.isFinish = true;
    this.auctionProductService.getAuctionList(this.product.idProduct).subscribe((data: AuctionDTO[]) => {
      if (data[0]?.memberId === Number(idMember)) {
        this.modalBody = 'You have successfully auctioned the product ' + this.product.nameProduct + '!';
        this.modalBackground = '#11B683';
        this.modalHidden = false;
        this.displayStyle = 'block';

        const addProductPromise = this.auctionProductService.addProductToCard(Number(idMember), this.idProduct).toPromise();
        addProductPromise.then(() => {
          const y = setInterval(() => {

            const productPromise = this.getProductById(this.idProduct).toPromise();
            productPromise.then((dataProduct) => {
              if (dataProduct.flagDelete) {
                clearInterval(y);
              } else {
                const cartPromise = this.auctionProductService.getCardByMemberId(Number(idMember)).toPromise();
                cartPromise.then((cartData) => {
                  const paymentLink = 'http://localhost:4200/auction-product/auction/1';
                  // tslint:disable-next-line:triple-equals
                  if (cartData?.warning == '0') {
                    console.log('im here');
                    this.auctionProductService.sendPaymentEmail(this.member.emailMember, this.product.nameProduct).subscribe();
                    let updateCart;
                    updateCart = cartData;
                    updateCart.warning = '1';
                    this.auctionProductService.updateCart(updateCart).subscribe();
                    // tslint:disable-next-line:triple-equals
                  } else if (cartData?.warning == '1') {
                    this.auctionProductService.sendPaymentEmail(this.member.emailMember, this.product.nameProduct).subscribe();
                    let updateCart;
                    updateCart = cartData;
                    updateCart.warning = '2';
                    this.auctionProductService.updateCart(updateCart).subscribe();
                    // tslint:disable-next-line:triple-equals
                  } else if (cartData?.warning == '2') {
                    this.auctionProductService.sendPaymentEmail(this.member.emailMember, this.product.nameProduct).subscribe();
                    let updateCart;
                    updateCart = cartData;
                    updateCart.warning = '3';
                    this.auctionProductService.updateCart(updateCart).subscribe();
                    // tslint:disable-next-line:triple-equals
                  } else if (cartData?.warning == '4') {
                    console.log('block member');
                    clearInterval(y);
                  }
                }, (error) => {
                  console.log('Promise rejected with ' + JSON.stringify(error));
                });
              }
            }, (error) => {
              console.log('Promise rejected with ' + JSON.stringify(error));
            });
          }, 6000);
        }, (error) => {
          console.log('Promise rejected with ' + JSON.stringify(error));
        });
      }
    });
  }
}
