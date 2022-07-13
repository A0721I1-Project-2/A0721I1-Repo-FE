import { Component, OnInit } from '@angular/core';
import {HomeService} from '../service/home.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../model/Product';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-show-home',
  templateUrl: './show-home.component.html',
  styleUrls: ['./show-home.component.css']
})
export class ShowHomeComponent implements OnInit {
  products: Product[];
  min: number;
  max: number;
  typeProductName: string;
  formSearch: FormGroup;
  flagCheck = false;
  checkFinished = false;
  checkLoadMore = false;
  checkHiddenLoadMore = false;
  nameProductSearch: string;
  // tslint:disable-next-line:ban-types
  messageAlert: String[];
  currentItem = 8;
  constructor(private homeService: HomeService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.showListProductAuction();
    this.formSearch = new FormGroup({
      nameProduct: new FormControl('', [Validators.required, Validators.pattern('^[^!@#$%^&*]+$')]),
      typeProductname: new FormControl(''),
      priceRange: new FormControl(''),
    });
  }
  showListProductAuction() {
    this.homeService.showListProductAuction().subscribe(
      (data) => {
        // tslint:disable-next-line:prefer-const
        this.products = data;
        // this.showListAuntionWithTime();
        if (this.nameProductSearch != null) {
          this.nameProductSearch = '';
        }
        this.checkLoadMore = false;
        if (!this.checkLoadMore) {
          this.currentItem = 8;
        }
        // console.log(data);
      },
      () => {
        console.log('Error product list');
      },
      () => {
        this.showListAuntionWithTime();
        this.checkFinished = false;
        this.checkLoadMore = false;
        this.checkHiddenLoadMore = false;
        const loadMoreBtn = document.querySelector('#load-more');
        // tslint:disable-next-line:triple-equals
        if (this.checkHiddenLoadMore == false) {
          // @ts-ignore
          // tslint:disable-next-line:no-unused-expression
          loadMoreBtn.style.display = 'inline-block';
        }
      }
    );
  }
  /*showListProductAuction() {
    this.showListAuntionWithTime();
    // this.showListAuntionWithTime();
    if (this.nameProductSearch != null) {
      this.nameProductSearch = '';
    }
    this.checkLoadMore = false;
    if (!this.checkLoadMore) {
      this.currentItem = 4;
    }
    this.checkFinished = false;
    this.checkLoadMore = false;
    this.checkHiddenLoadMore = false;
    const loadMoreBtn = document.querySelector('#load-more');
      // tslint:disable-next-line:triple-equals
    if (this.checkHiddenLoadMore == false) {
        // @ts-ignore
        // tslint:disable-next-line:no-unused-expression
        loadMoreBtn.style.display = 'inline-block';
      }
    }*/



  showListAuntionWithTime() {
    this.homeService.showListProductAuction().subscribe(
      (data) => {
        // tslint:disable-next-line:prefer-const
        let products = [];
        // tslint:disable-next-line:prefer-const
        let countDownDate: number[] = [];
        products = this.products = data;
        for (let i = 0; i < products.length; i++) {
          // tslint:disable-next-line:prefer-const
          countDownDate[i] = new Date(this.products[i].endDate).getTime();
          // console.log(i + '//' + this.products[i].endDate);
          // console.log(countDownDate[i]);
        }
        // console.log(countDownDate);
// Update the count down every 1 second
        // tslint:disable-next-line:only-arrow-functions no-shadowed-variable prefer-const
        // for (let i = 0; i < countDownDate.length; i++) {

        for (let j = 0; j < countDownDate.length; j++) {
          // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
          (function(j) {
            // tslint:disable-next-line:only-arrow-functions
            const x = setInterval(function() {
              // console.log(countDownDate[j]);
              // Get today's date and time
              const now = new Date().getTime();
              // console.log(now);
              // Find the distance between now and the count down date
              const distance = [];
              // console.log(countDownDate[0]);
              distance[j] = countDownDate[j] - now;
              // Time calculations for days, hours, minutes and seconds
              const days = Math.floor(distance[j] / (1000 * 60 * 60 * 24));
              const hours = Math.floor((distance[j] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((distance[j] % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((distance[j] % (1000 * 60)) / 1000);
              // Display the result in the element with id="demo"
              products[j].remainingTime = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
              // If the count down is finished, write some text
              if (distance[j] < 0) {
                clearInterval(x);
                products[j].remainingTime  = 'FINISHED';
              }
            }, 1000);
          })(j);
          // }
        }

        if (this.nameProductSearch != null) {
          this.nameProductSearch = '';
        }
        // console.log(data);
      },
    );
  }

//   showListAuntionWithTime() {
//     this.homeService.showListProductAuction().subscribe(
//       (data) => {
//         // tslint:disable-next-line:prefer-const
//         let products = [];
//         // tslint:disable-next-line:prefer-const
//         let countDownDate: number[] = [];
//         products = this.products = data;
//         for (let i = 0; i < products.length; i++) {
//           // tslint:disable-next-line:prefer-const
//           countDownDate[i] = new Date(this.products[i].endDate).getTime();
//           console.log(i + '//' + this.products[i].endDate);
//           console.log(countDownDate[i]);
//         }
//         console.log(countDownDate);
// // Update the count down every 1 second
//         // tslint:disable-next-line:only-arrow-functions no-shadowed-variable prefer-const
//         // for (let i = 0; i < countDownDate.length; i++) {
//
//         // for (let j = 0; j < countDownDate.length; j++) {
//         // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
//         let j = 0;
//         // tslint:disable-next-line:only-arrow-functions
//         const x = setInterval(function() {
//           const distance = [];
//           if ( j < countDownDate.length) {
//             // console.log(countDownDate[j]);
//             // Get today's date and time
//             const now = new Date().getTime();
//             // console.log(now);
//             // Find the distance between now and the count down date
//             // console.log(countDownDate[0]);
//             distance[j] = countDownDate[j] - now;
//             // Time calculations for days, hours, minutes and seconds
//             const days = Math.floor(distance[j] / (1000 * 60 * 60 * 24));
//             const hours = Math.floor((distance[j] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//             const minutes = Math.floor((distance[j] % (1000 * 60 * 60)) / (1000 * 60));
//             const seconds = Math.floor((distance[j] % (1000 * 60)) / 1000);
//             // Display the result in the element with id="demo"
//             products[j].remainingTime = document.getElementById('time-remain').innerHTML = days + 'd ' + hours + 'h '
//               + minutes + 'm ' + seconds + 's ';
//           }
//           j++;
//           if (distance[j] < 0) {
//             clearInterval(x);
//             products[j].remainingTime = document.getElementById('time-remain').innerHTML = 'Finished';
//           }
//           // If the count down is finished, write some text
//         }, 1000);
//         // }
//         // }
//
//         if (this.nameProductSearch != null) {
//           this.nameProductSearch = '';
//         }
//         // console.log(data);
//       },
//     );
//   }

  showListAuntionFinishedWithTime() {
    this.homeService.showListProductFinished().subscribe(
      (data) => {
        // tslint:disable-next-line:prefer-const
        let products = [];
        const countDownDate: number[] = [];
        products = this.products = data;
        for (let i = 0; i < products.length; i++) {
          // tslint:disable-next-line:prefer-const
          countDownDate[i] = new Date(this.products[i].endDate).getTime();
          // console.log(i + '//' + this.products[i].endDate);
          // console.log(countDownDate[i]);
        }
        // console.log(countDownDate);
// Update the count down every 1 second
        // tslint:disable-next-line:only-arrow-functions no-shadowed-variable prefer-const
        // for (let i = 0; i < countDownDate.length; i++) {

        for (let j = 0; j < countDownDate.length; j++) {
          // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
          (function(j) {
            // tslint:disable-next-line:only-arrow-functions
            const x = setInterval(function() {
              // console.log(countDownDate[j]);
              // Get today's date and time
              const now = new Date().getTime();
              // console.log(now);
              // Find the distance between now and the count down date
              const distance = [];
              // console.log(countDownDate[0]);
              distance[j] = countDownDate[j] - now;
              console.log(distance[j]);
              // Time calculations for days, hours, minutes and seconds
              const days = Math.floor(distance[j] / (1000 * 60 * 60 * 24));
              const hours = Math.floor((distance[j] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((distance[j] % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((distance[j] % (1000 * 60)) / 1000);

              // If the count down is finished, write some text
              if (distance[j] < 0) {
                clearInterval(x);
                products[j].remainingTime = 'FINISHED';
              } else {
                // Display the result in the element with id="demo"
                products[j].remainingTime = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
              }
            }, 1000);
          })(j);
          // }
        }

        if (this.nameProductSearch != null) {
          this.nameProductSearch = '';
        }
        // console.log(data);
      },
    );
  }


  showListProductFinished() {
    this.homeService.showListProductFinished().subscribe(
      (data) => {
        this.products = data;
        if (this.nameProductSearch != null) {
          this.nameProductSearch = '';
        }
      },
      () => {
        console.log('Error list finished product');
      },
      () => {
        this.showListAuntionFinishedWithTime();
        this.checkFinished = true;
        this.checkLoadMore = true;
        this.checkHiddenLoadMore = false;
        if (this.checkLoadMore) {
          this.currentItem = 8;
        }
        const loadMoreBtn = document.querySelector('#load-more');
        // tslint:disable-next-line:triple-equals
        if (this.checkHiddenLoadMore == false) {
          // @ts-ignore
          // tslint:disable-next-line:no-unused-expression
          loadMoreBtn.style.display = 'inline-block';
        }
      }
    );
  }

  showListSortAuntionWithTime(typeProductName: string) {
    this.homeService.sortListProductByTypeProduct(typeProductName).subscribe(
      (data) => {
        // tslint:disable-next-line:prefer-const
        let products = [];
        const countDownDate: number[] = [];
        products = this.products = data;
        for (let i = 0; i < products.length; i++) {
          // tslint:disable-next-line:prefer-const
          countDownDate[i] = new Date(this.products[i].endDate).getTime();
          console.log(i + '//' + this.products[i].endDate);
          console.log(countDownDate[i]);
        }
        console.log(countDownDate);
// Update the count down every 1 second
        // tslint:disable-next-line:only-arrow-functions no-shadowed-variable prefer-const
        // for (let i = 0; i < countDownDate.length; i++) {

        for (let j = 0; j < countDownDate.length; j++) {
          // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
          (function(j) {
            // tslint:disable-next-line:only-arrow-functions
            const x = setInterval(function() {
              // console.log(countDownDate[j]);
              // Get today's date and time
              const now = new Date().getTime();
              // console.log(now);
              // Find the distance between now and the count down date
              const distance = [];
              // console.log(countDownDate[0]);
              distance[j] = countDownDate[j] - now;
              // Time calculations for days, hours, minutes and seconds
              const days = Math.floor(distance[j] / (1000 * 60 * 60 * 24));
              const hours = Math.floor((distance[j] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((distance[j] % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((distance[j] % (1000 * 60)) / 1000);

              // If the count down is finished, write some text
              if (distance[j] < 0) {
                clearInterval(x);
                products[j].remainingTime = 'FINISHED';
              } else {
                // Display the result in the element with id="demo"
                products[j].remainingTime = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
              }
            }, 1000);
          })(j);
          // }
        }

        if (this.nameProductSearch != null) {
          this.nameProductSearch = '';
        }
        // console.log(data);
      },
    );
  }

  sortListProductByTypeProductName(typeProductName: string) {
    this.homeService.sortListProductByTypeProduct(typeProductName).subscribe(
      (data) => {
        this.products = data;
        if (this.nameProductSearch != null) {
          this.nameProductSearch = '';
        }
        // console.log(data);
      },
      () => {
      },
      () => {
        this.showListSortAuntionWithTime(typeProductName);
        this.checkLoadMore = true;
        if (this.checkLoadMore) {
          this.currentItem = 8;
        }
        this.checkHiddenLoadMore = false;
        const loadMoreBtn = document.querySelector('#load-more');
        // tslint:disable-next-line:triple-equals
        if (this.checkHiddenLoadMore == false) {
          // @ts-ignore
          // tslint:disable-next-line:no-unused-expression
          loadMoreBtn.style.display = 'inline-block';
        }
      }
    );
  }

  searchForm() {
    const nameProduct = this.formSearch.value.nameProduct;
    const typeProductName = this.formSearch.value.typeProductname;
    const priceRange = this.formSearch.value.priceRange;
    console.log(nameProduct);
    console.log(typeProductName);
    console.log(priceRange);
    this.messageAlert = [];
    if (this.formSearch?.invalid) {
      if (this.formSearch.get('nameProduct').errors.required) {
        this.messageAlert.push('The product name to be searched cannot be empty');
        this.showListProductAuction();
      }
      if (this.formSearch.get('nameProduct').errors.pattern) {
        this.messageAlert.push('The product name cannot contain special characters(!@#$%^&*)');
        this.showListProductAuction();
      }
    } else {
      // @ts-ignore
      // $('#myModal').modal('hide');
      $('#myModal').modal('hide');
    }
    if (priceRange === '$0 – $5') {
      this.min = 0;
      this.max = 5;
      this.flagCheck = true;
    }
    if (priceRange === '$5 – $25') {
      this.min = 5;
      this.max = 25;
      this.flagCheck = true;
    }
    if (priceRange === '$25 – $50') {
      this.min = 25;
      this.max = 50;
      this.flagCheck = true;
    }
    if (priceRange === '$50 - $250') {
      this.min = 50;
      this.max = 250;
      this.flagCheck = true;
    }
    if (priceRange === '') {
      this.min = 0;
      this.flagCheck = false;
    }
    if (priceRange === 'Over $250') {
      this.min = 250;
      this.flagCheck = false;
    }
    if (this.flagCheck) {
      this.homeService.searchListProduct(nameProduct, typeProductName, this.min, this.max).subscribe(
        (data) => {
          // Code line: time-left use setInterval and For loop
          let products = [];
          const countDownDate: number[] = [];
          this.checkLoadMore = true;
          products = this.products = data;
          for (let i = 0; i < products.length; i++) {
            // tslint:disable-next-line:prefer-const
            countDownDate[i] = new Date(this.products[i].endDate).getTime();
            console.log(i + '//' + this.products[i].endDate);
            console.log(countDownDate[i]);
          }
          console.log(countDownDate);
// Update the count down every 1 second
          // tslint:disable-next-line:only-arrow-functions no-shadowed-variable prefer-const
          // for (let i = 0; i < countDownDate.length; i++) {

          for (let j = 0; j < countDownDate.length; j++) {
            // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
            (function(j) {
              // tslint:disable-next-line:only-arrow-functions
              const x = setInterval(function() {
                // console.log(countDownDate[j]);
                // Get today's date and time
                const now = new Date().getTime();
                // console.log(now);
                // Find the distance between now and the count down date
                const distance = [];
                // console.log(countDownDate[0]);
                distance[j] = countDownDate[j] - now;
                // Time calculations for days, hours, minutes and seconds
                const days = Math.floor(distance[j] / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance[j] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance[j] % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance[j] % (1000 * 60)) / 1000);

                // If the count down is finished, write some text
                if (distance[j] < 0) {
                  clearInterval(x);
                  products[j].remainingTime = 'FINISHED';
                } else {
                  // Display the result in the element with id="demo"
                  products[j].remainingTime = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
                }
              }, 1000);
            })(j);
            // }
          }

        },
        () => {
        },
        () => {
          this.checkLoadMore = true;
          if (this.checkLoadMore) {
            this.currentItem = 8;
          }
          this.checkHiddenLoadMore = false;
          const loadMoreBtn = document.querySelector('#load-more');
          // tslint:disable-next-line:triple-equals
          if (this.checkHiddenLoadMore == false) {
            // @ts-ignore
            // tslint:disable-next-line:no-unused-expression
            loadMoreBtn.style.display = 'inline-block';
          }
        }
      );
    } else {
      this.homeService.searchListProductByPriceOver250(nameProduct, typeProductName, this.min).subscribe(
        (data) => {
          // Code line: time-left use setInterval and For loop
          let products = [];
          const countDownDate: number[] = [];
          this.checkLoadMore = true;
          products = this.products = data;
          for (let i = 0; i < products.length; i++) {
            // tslint:disable-next-line:prefer-const
            countDownDate[i] = new Date(this.products[i].endDate).getTime();
            console.log(i + '//' + this.products[i].endDate);
            console.log(countDownDate[i]);
          }
          console.log(countDownDate);
// Update the count down every 1 second
          // tslint:disable-next-line:only-arrow-functions no-shadowed-variable prefer-const
          // for (let i = 0; i < countDownDate.length; i++) {

          for (let j = 0; j < countDownDate.length; j++) {
            // tslint:disable-next-line:only-arrow-functions no-shadowed-variable
            (function(j) {
              // tslint:disable-next-line:only-arrow-functions
              const x = setInterval(function() {
                // console.log(countDownDate[j]);
                // Get today's date and time
                const now = new Date().getTime();
                // console.log(now);
                // Find the distance between now and the count down date
                const distance = [];
                // console.log(countDownDate[0]);
                distance[j] = countDownDate[j] - now;
                // Time calculations for days, hours, minutes and seconds
                const days = Math.floor(distance[j] / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance[j] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance[j] % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance[j] % (1000 * 60)) / 1000);

                // If the count down is finished, write some text
                if (distance[j] < 0) {
                  clearInterval(x);
                  products[j].remainingTime = 'FINISHED';
                } else {
                  // Display the result in the element with id="demo"
                  products[j].remainingTime = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';
                }
              }, 1000);
            })(j);
            // }
          }
        },
        () => {
        },
        () => {
          this.checkLoadMore = true;
          if (this.checkLoadMore) {
            this.currentItem = 8;
          }
          this.checkHiddenLoadMore = false;
          const loadMoreBtn = document.querySelector('#load-more');
          // tslint:disable-next-line:triple-equals
          if (this.checkHiddenLoadMore == false) {
            // @ts-ignore
            // tslint:disable-next-line:no-unused-expression
            loadMoreBtn.style.display = 'inline-block';
          }
        }
      );
    }
  }

  loadMore() {
    // @ts-ignore
    const boxes = [...document.querySelectorAll('.col-xl-3')];
    console.log('Chiều dài boxes = ' + boxes.length);
    console.log('currenItem ben ngoai = ' + this.currentItem);
    const loadMoreBtn = document.querySelector('#load-more');
    // @ts-ignore

    if (this.currentItem < boxes.length) {
      for (let i = this.currentItem; i < this.currentItem + 8; i++) {
        // @ts-ignore
        if ($('.col-xl-3:hidden').length > 0) {
          boxes[i].style.display = 'inline-block';
        }
        console.log('currenItem ben trong loop = ' + this.currentItem);
      }
      this.currentItem += 8;
    }


    // tslint:disable-next-line:triple-equals
    // @ts-ignore
    // tslint:disable-next-line:triple-equals
    if ($('.col-xl-3:hidden').length == 0) {
      this.checkHiddenLoadMore = true;
      if (this.checkHiddenLoadMore) {
        // @ts-ignore
        // tslint:disable-next-line:no-unused-expression
        loadMoreBtn.style.display = 'none';
      }
    }
    // @ts-ignore
    console.log('số boxes còn lại = ' + $('.col-xl-3:hidden').length);
  }
}
