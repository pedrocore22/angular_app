import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prices'
})
export class PricesPipe implements PipeTransform {

  transform(value: number): string {
    const factor = Math.pow(10,2); 
    let roundedValue;
    if(value < 0) {
      roundedValue = (Math.round(-value * factor) / factor) * -1;
    } else {
      roundedValue = Math.round(value * factor) / factor;
    }
    const formatValue = new Intl.NumberFormat('de-DE', 
                            {minimumFractionDigits: 2}).format(roundedValue);
    return formatValue + ' €';
  }

}
