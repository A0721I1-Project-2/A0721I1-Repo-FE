import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/Product';
import {HomeService} from '../service/home.service';
import {ActivatedRoute} from '@angular/router';
import {AuctionDTO} from '../../model/auctionDTO';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  arrayImage: string[] = [];
  id: any;
  // 0: not available
  // 1: available for bidding
  // 2: not start
  checkAvailable: number;
  winner: string;

  constructor(private homeService: HomeService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProductDetail();
    console.log(this.product);
  }

  ngOnInit(): void {
    this.getProductTime();
    this.getAuctionHighest();

    const imagePromise = this.getImageByProductId(this.id).toPromise();
    imagePromise.then((data) => {
      for (let i = 0; i < data.length; i++) {
        this.arrayImage[i] = data[i].imageProduct;
      }
      (document.getElementById('mainImage') as HTMLImageElement).src = this.arrayImage[0];
      document.getElementById('numbertext').innerText = '1/' + this.arrayImage.length;
    }, (error) => {
      console.log('Promise rejected with ' + JSON.stringify(error));
    });
  }

  getProductTime() {
    this.homeService.getProductByIdForProductDetail(this.id).subscribe(data => {
      // tslint:disable-next-line:max-line-length
      if (new Date(this.product.startDate).getTime() <= new Date().getTime() && new Date(this.product.endDate).getTime() >= new Date().getTime()) {
        this.checkAvailable = 1;
        const id = this.id;
        const countDownDate = new Date(this.product.endDate).getTime();
        const product = this.product = data;
        // tslint:disable-next-line:only-arrow-functions
        const x = setInterval(function() {
          const now = new Date().getTime();
          const distance = countDownDate - now;
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          // document.getElementById('time-remain-' + id).innerHTML = days + 'd ' + hours + 'h '
          //   + minutes + 'm ' + seconds + 's ';
          product.remainingTime = days + 'd ' + hours + 'h '
            + minutes + 'm ' + seconds + 's ';
          if (distance < 0) {
            clearInterval(x);
            product.remainingTime = 'Finished';
          }
        }, 1000);
      } else if (new Date(this.product.startDate).getTime() > new Date().getTime()) {
        this.checkAvailable = 2;
        this.product.remainingTime = 'Not Start';
      } else {
        this.checkAvailable = 0;
        this.product.remainingTime = 'Finished';
      }
    });
  }

  getProductDetail() {
    this.homeService.getProductByIdForProductDetail(this.id).subscribe(data => {
      this.product = data;
    });
  }

  getAuctionHighest() {
    this.homeService.getAuctionList(this.id).subscribe((auctions: AuctionDTO[]) => {
      if (auctions != null) {
        this.winner = auctions[0].username;
      }
    });
  }


  getImageByProductId(id: number) {
    return this.homeService.getImageByProductId(id);
  }


  nextImage() {
    const mainImage = document.getElementById('mainImage') as HTMLImageElement;
    let image = '';
    let numberText;
    if (mainImage.src.indexOf((this.arrayImage)[this.arrayImage.length - 1]) === -1) {
      for (let index = 0; index < this.arrayImage.length - 1; index++) {

        if (mainImage.src.indexOf((this.arrayImage)[index]) !== -1) {
          image = (this.arrayImage)[index + 1];
          numberText = index + 2;
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

    if (src.indexOf(this.arrayImage[0]) === -1) {
      for (let index = 1; index < this.arrayImage.length; index++) {

        if (src.indexOf(this.arrayImage[index]) !== -1) {
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

  changeSlide(index) {
    (document.getElementById('mainImage') as HTMLImageElement).src = this.arrayImage[index];
    document.getElementById('numbertext').innerText = (index + 1) + '/' + this.arrayImage.length;
  }
}
