import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  transform(value: any, phrase): any {
    if (value && value.replace && phrase) {
      return value.replace(new RegExp('('+ phrase +')', 'gi'), '<span class="highlighted">$1</span>');
    } else {
      return value;
    }
  }
}
