import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from '../service/payment.service';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import * as htmlToImage from 'html-to-image';
import { Subscription } from 'rxjs';
import {InvoiceDetail} from "../../model/InvoiceDetail";
import {Payment} from "../../model/Payment";
import {Router} from "@angular/router";



@Component({
  selector: 'app-invoice-payment',
  templateUrl: './invoice-payment.component.html',
  styleUrls: ['./invoice-payment.component.css']
})
export class InvoicePaymentComponent implements OnInit {
///pdf
  private url1: string;
  ///
  private subscription: Subscription | undefined;
  invoice: InvoiceDetail[];
  payment: Payment;
  total: number = 0;
  feeTransport: number;
  invoiceDetail: any;
  item = 0;
  address: string;
  today: Date;
  Paymethod: string;
  Trsanpot: string;
  constructor(private paymentService: PaymentService, @Inject(AngularFireStorage) private storage: AngularFireStorage
  ,private service: PaymentService, private router: Router,) { }
  ngOnInit(): void {
    this.today = new Date();
    console.log(this.today)
    this.findAllStatusInvoice();
  }

  ///pdf
  print() {
    const data = document.getElementById('pdfTable');
    console.log(data);
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg', 1.0)
      console.log(contentDataURL);
      const pdf = new jspdf('l', 'cm', 'a4');
      pdf.addImage(contentDataURL, 'jpg', 0, 0, 29.7, 21.0);
      pdf.output('dataurlnewwindow');
      // const pdfDocument = pdf.save( 'invoice.pdf');
      ///
      const file = pdf.output('blob');
      const filePath = Date.now().toString();
      const nameImg = '/A0721I123432' + filePath + '.pdf' ;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, file).snapshotChanges().pipe(
        finalize
        (() => {
          fileRef.getDownloadURL().subscribe((url) => {
           this.url1 = url;
           console.log(this.url1);
           this.paymentService.postImagePDFAndSendEmail(this.url1).subscribe();
          });
        })
      ).subscribe();
    });
    ///

  }

  scroll() {
    window.scroll(0,0)
  }
  /////

  findAllStatusInvoice() {
    this.service.findAllStatusInvoice().subscribe(
      (data) => {
        console.log(data);
        this.invoice = data;

        this.address = data[0].invoice.payment.addressReceiver;
        this.feeTransport = data[0].invoice.payment.transport.feeTransport;
        console.log(this.feeTransport)
        this.invoiceDetail = data[0].invoice.payment;
        this.Paymethod = this.invoiceDetail.paymentMethod.namePaymentMethod;
        this.Trsanpot = this.invoiceDetail.transport.nameTransport
        console.log(this.invoiceDetail.paymentMethod.namePaymentMethod)
        console.log(this.Trsanpot)
        // this.PaymentMethod = data[0].
        console.log(this.invoice);
        for (let i = 0; i < data.length; i++) {
          this.total += data[i].product.finalPrice;
          console.log(this.total)


        }
        console.log('check', this.invoice);
      },
      () => {
      },
      () => {
      },
    );
  }

}
