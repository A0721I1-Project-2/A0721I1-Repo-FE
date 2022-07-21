import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from '../service/payment.service';
import html2canvas from 'html2canvas';

import jspdf from 'jspdf';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import * as htmlToImage from 'html-to-image';

@Component({
  selector: 'app-invoice-payment',
  templateUrl: './invoice-payment.component.html',
  styleUrls: ['./invoice-payment.component.css']
})
export class InvoicePaymentComponent implements OnInit {

  private url1: string;

  constructor(private paymentService: PaymentService, @Inject(AngularFireStorage) private storage: AngularFireStorage) { }
  ngOnInit(): void {
  }
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
}
