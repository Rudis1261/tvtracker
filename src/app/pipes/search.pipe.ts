import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], field : string, value : string): any[] {
    if (!items) return [];
    if (value && (value == "" || value == "*")) {
      return items;
    }
    var found = [];
    items.forEach((item) => {
      if (item[field] && item[field].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        found.push(item);
      }
    });

    return found;
  }
}
