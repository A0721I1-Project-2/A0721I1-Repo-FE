import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentRoutingModule } from './payment-routing.module';
import { InvoicePaymentComponent } from './invoice-payment/invoice-payment.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from './environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaymentCartComponent} from './payment-cart/payment-cart.component';



@NgModule({
  declarations: [InvoicePaymentComponent, PaymentCartComponent],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ]
})
export class PaymentModule { }
