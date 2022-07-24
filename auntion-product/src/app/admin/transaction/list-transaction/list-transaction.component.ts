import {Component, OnInit} from '@angular/core';
import {TransactionService} from '../service/transaction.service';
import {FormControl, FormGroup} from '@angular/forms';
import {InvoiceDetail} from '../../../model/InvoiceDetail';
import {Invoice} from '../../../model/Invoice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css']
})
export class ListTransactionComponent implements OnInit {

  totalPagination: number;
  emptyForm = false;
  pageNumber = 0;
  public searchTransaction: FormGroup;
  listTransactionNotPagination: InvoiceDetail[];
  invoiceDetail: InvoiceDetail[] = [];
  totalPage: number[] = [];
  invoice: Invoice[] = [];
  result = 0;
  item;
  total = 0;
  Status = 'Status';

  street: string;

  /* Initial properties for delete invoice */
  idInvoice: any;
  idInvoiceChecked: any;
  listIdInvoice: any[] = [];

  constructor(private transactionService: TransactionService) {
  }

  ngOnInit(): void {
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
      this.invoiceDetail = data.content;
      this.setPage(data.totalPages);
    });
  }

  searchDate() {
    this.transactionService.searchDate(this.searchTransaction.value.startDate, this.searchTransaction.value.endDate)
      .subscribe((data: any) => {
        this.invoiceDetail = data.content;
        this.findSum(this.invoiceDetail);
        this.setPage(data.totalPages);
      });
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

  findSum(data) {
    this.item = data;
    for (let i = 0; i < data.length; i++) {
      this.result = this.item[i].product.finalPrice + this.item[i].invoice.payment.feeService;
      this.total += this.result;
    }
  }


  /* */
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
          this.ngOnInit();
        });
      }
    }
  }
}
