import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/Product';
import {HomeService} from '../service/home.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  arrayImage: any;
  id: string;

  constructor(private homeService: HomeService, private route: ActivatedRoute, private http: HttpClient) {
  }


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProductDetail();
    this.imgFunc();
  }

  getProductDetail() {
    this.homeService.getProductByIdForProductDetail(this.id).subscribe(data => {
      this.product = data;
      console.log(this.product);
    });
  }

  imgFunc() {
    this.arrayImage = ['https://cdn.tgdd.vn/Products/Images/42/271697/samsung-galaxy-s22-ultra-xanh-reu-1.jpg', 'https://cdn.tgdd.vn/Products/Images/42/271697/samsung-galaxy-s22-ultra-xanh-reu-3.jpg', 'https://cdn.tgdd.vn/Products/Images/42/271697/samsung-galaxy-s22-ultra-xanh-reu-4.jpg', 'https://cdn.tgdd.vn/Products/Images/42/271697/samsung-galaxy-s22-ultra-xanh-reu-5.jpg', 'https://cdn.tgdd.vn/Products/Images/42/271697/samsung-galaxy-s22-ultra-xanh-reu-6.jpg', 'https://cdn.tgdd.vn/Products/Images/42/271697/samsung-galaxy-s22-ultra-xanh-reu-7.jpg', 'https://cdn.tgdd.vn/Products/Images/42/271697/samsung-galaxy-s22-ultra-xanh-reu-8.jpg'];

    (document.getElementById('mainImage') as HTMLImageElement).src = this.arrayImage[0];
    document.getElementById('numbertext').innerText = '1/' + this.arrayImage.length;

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
      document.getElementById('time-remain').innerHTML = days + 'd ' + hours + 'h '
        + minutes + 'm ' + seconds + 's ';

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        document.getElementById('time-remain').innerHTML = 'Finished';
        document.getElementById('winner').innerHTML = 'Winner';
        document.getElementById('isFinish').click();
      }
    }, 1000);
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

  changeSlide(index) {
    (document.getElementById('mainImage') as HTMLImageElement).src = this.arrayImage[index];
    document.getElementById('numbertext').innerText = (index + 1) + '/' + this.arrayImage.length;
  }
}
