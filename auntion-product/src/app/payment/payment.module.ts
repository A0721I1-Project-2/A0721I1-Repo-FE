import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { InvoicePaymentComponent } from './invoice-payment/invoice-payment.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from './environments/environment';



@NgModule({
  declarations: [InvoicePaymentComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ]
})
export class PaymentModule { }
