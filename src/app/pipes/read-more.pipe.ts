import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readMore'
})
export class ReadMorePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {
      return value;
    }
    return value.slice(0, args);
  }
}
