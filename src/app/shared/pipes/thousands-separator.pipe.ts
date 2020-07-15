import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousandsSeparator'
})
export class ThousandsSeparatorPipe implements PipeTransform {

  transform(value: string | number): string {
    if (value === undefined || value === null) {
      return null;
    }
    return parseInt(String(value), 10).toLocaleString();
  }

}
