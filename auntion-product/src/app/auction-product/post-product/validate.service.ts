import { Injectable } from '@angular/core';
import {AuctionProductService} from '../service/auction-product.service';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {Product} from '../../model/Product';
import {map} from 'rxjs/operators';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export function checkCodeProduct(userProduct: AuctionProductService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userProduct.checkId(control.value).pipe( map (
      (product: Product[]) => {
        return (product && product.length > 0) ? {'checkCodeProduct': true} : null;
      }
    ));
  };
}
