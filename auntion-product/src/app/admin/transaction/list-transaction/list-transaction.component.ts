import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../service/transaction.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {InvoiceDetail} from '../../../model/InvoiceDetail';
import {Invoice} from '../../../model/Invoice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css']
})
export class ListTransactionComponent implements OnInit {

  public searchTransaction: FormGroup;
  listTransactionNotPagination: InvoiceDetail[];
  invoiceDetail: InvoiceDetail[] = [];
  invoice: Invoice[] = [];


  // pagination
  totalPagination: number;
  emptyForm = false;
  pageNumber = 0;
  totalPage: number[] = [];

  // total revenue
  result = 0;
  item;
  total = 0;

  // selected status
  Status = 'Status';

  /* Initial properties for delete invoice */
  idInvoice: any;
  idInvoiceChecked: any;
  listIdInvoice: any[] = [];

  // search not pound
  searchNotFound = false;

  constructor(private transactionService: TransactionService) {
  }

  VALIDATE_MESSAGES = {
    contentSearch: [
      {type: 'pattern', message: 'Tên không đúng định dạng'},
    ]
  };

  ngOnInit(): void {
    // this.deleteAfter30Days();
    const hideNavHp = document.querySelector('#header');
    const hideFooterHp = document.querySelector('.footer__container');

// @ts-ignore
// tslint:disable-next-line:no-unused-expression
    hideNavHp.style.display = 'none';
// @ts-ignore
// tslint:disable-next-line:no-unused-expression
    hideFooterHp.style.display = 'none';
    this.transactionService.getAll(this.pageNumber).subscribe((data: any) => {
      this.invoiceDetail = data.content;
    });

    this.searchTransaction = new FormGroup({
      nameSeller: new FormControl(''),
      nameBuyer: new FormControl(''),
      nameProduct: new FormControl(''),
      status: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl('')
    });

    this.transactionService.getAllNotPagination().subscribe((data: any) => {

      this.listTransactionNotPagination = data.content;

      if ((this.listTransactionNotPagination.length % 5) !== 0) {
        this.totalPagination = (Math.round(this.listTransactionNotPagination.length / 5)) + 1;
      }
    });
    this.showPage(this.pageNumber);
  }

  showPage(page: number) {
    page = this.pageNumber;
    this.transactionService.getAll(page).subscribe((data: any) => {
      this.invoiceDetail = data.content;
      this.setPage(data.totalPages);
      console.log(data.totalPages);
    });
  }

  search() {
    this.total = 0;
    if (this.searchTransaction.value.nameSeller === '' || this.searchTransaction.value.nameSeller === undefined) {
      this.searchTransaction.value.nameSeller = 'null';
    }
    if (this.searchTransaction.value.nameBuyer === '') {
      this.searchTransaction.value.nameBuyer = 'null';
    }
    if (this.searchTransaction.value.nameProduct === '') {
      this.searchTransaction.value.nameProduct = 'null';
    }
    if (this.searchTransaction.value.status === '') {
      this.searchTransaction.value.status = 'null';
    }

    if (this.searchTransaction.value.nameSeller === 'null'
      && this.searchTransaction.value.nameBuyer === 'null'
      && this.searchTransaction.value.nameProduct === 'null'
      && this.searchTransaction.value.status === 'null') {
      this.emptyForm = true;
    }
    this.pageNumber = 0;
    this.transactionService.search(this.searchTransaction.value.nameSeller, this.searchTransaction.value.nameBuyer,
      this.searchTransaction.value.nameProduct, this.searchTransaction.value.status
    ).subscribe((data: any) => {
      if (data == null) {
        this.searchNotFound = true;
        console.log(this.searchNotFound);
      }else {
        this.searchNotFound = false;
        this.invoiceDetail = data.content;
        this.setPage(data.totalPages);
      }
    });
  }

  searchDate() {
    this.total = 0;
    if (this.searchTransaction.value.startDate <= this.searchTransaction.value.endDate) {
      this.transactionService.searchDate(this.searchTransaction.value.startDate, this.searchTransaction.value.endDate)
        .subscribe((data: any) => {
          if (data === null) {
            this.searchNotFound = true;
          }else {
            this.searchNotFound = false;
            this.invoiceDetail = data.content;
            this.findSum(this.invoiceDetail);
            this.setPage(data.totalPages);
          }
        });
    }else {
      Swal.fire(
        'The start date must be less than the end date. Please re-enter',
        '',
        'error'
      );
    }

  }

  nextPage() {
    if (this.pageNumber === this.totalPage.length) {
      alert('Không thể chuyển qua trang sau!');
    } else {
      this.pageNumber += 1;
      this.showPage(this.pageNumber);
    }
  }


  previousPage() {
    if (this.pageNumber <= 0) {
      alert('Không thể chuyển qua trang trước!');
    } else {
      this.pageNumber -= 1;
      this.showPage(this.pageNumber);
    }
  }

  private setPage(totalPages: any) {
    this.totalPage = new Array(totalPages);
  }

  changePageNumber(i: number) {
    this.pageNumber = i;
    this.showPage(this.pageNumber);
  }

  // sum total
  findSum(data) {
    this.item = data;
    console.log(this.invoiceDetail);
    for (let i = 0; i < data.length; i++) {
      this.result = this.item[i].product.finalPrice + this.item[i].invoice.payment.feeService;
      this.total += this.result;
    }
  }


  /* add id checked */
  onChangeDelete($event: any) {
    this.idInvoice = $event.target.value;
    this.idInvoiceChecked = $event.target.checked;
    console.log(this.idInvoiceChecked);
    if (this.idInvoiceChecked) {
      this.listIdInvoice.push(this.idInvoice);
    } else {
      this.idInvoiceChecked.splice(this.idInvoiceChecked.indexOf(this.idInvoice), 1);
    }
  }

  /* Delete invoice */

  deleteInvoice() {
    if (this.listIdInvoice.length === 0) {
      Swal.fire(
        'you must select before delete',
        '',
        'error'
      );
    } else {
      for (let i = 0; i < this.listIdInvoice.length; i++) {
        this.transactionService.delete(this.listIdInvoice[i]).subscribe(() => {
          Swal.fire(
            'Delete Transaction successfully',
            '',
            'success'
          );
          this.listIdInvoice = [];
          this.ngOnInit();

        });
      }
    }
  }

  // show total revenue
  showTotal() {
      // @ts-ignore
    const  o = (document.querySelector('.total-revenue').style.display = 'flex');
  }

  // deleteAfter30Days() {
  //   this.transactionService.deleteAfter30Days().subscribe();
  // }
}
