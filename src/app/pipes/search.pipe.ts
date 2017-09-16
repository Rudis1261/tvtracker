import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], field : string, value : string): any[] {
    if (!items) return [];

    if (!field || !value || field == "" || value == "") {
      return items;
    }

    if (value && (value == "" || value == "*")) {
      return items;
    }

    var found = [];
    var fields = field.split(",");
    items.forEach((item) => {
      fields.forEach((find) => {
        if (item[find] && item[find].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          if (found.indexOf(item) == -1) {
            found.push(item);
          }
        }
      });
    });

    return found;
  }
}
