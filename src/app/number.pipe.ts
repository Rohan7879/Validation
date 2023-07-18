import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number'
})

 
  export class NumberPipe implements PipeTransform {
    transform(phoneNumber: string): string {
      const cleanNumber = phoneNumber.replace(/\D/g, '');
      if (cleanNumber.length !== 10) {
        return phoneNumber;
      }
      const formattedNumber = `(${cleanNumber.slice(0, 3)}) ${cleanNumber.slice(3, 6)}-${cleanNumber.slice(6, 10)}`;
      return formattedNumber;
    }

}
