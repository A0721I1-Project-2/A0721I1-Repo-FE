import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDate'
})
export class CustomDatepipe extends
  DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, 'mm-dd-yyyy hh:mm:ss');
  }
}
