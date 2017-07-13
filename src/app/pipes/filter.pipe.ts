import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {
	transform(items: any[], field : string, value : string, inverse: boolean = false): any[] {
		if (!items) return [];
		// console.log(
		// 	"FIELD:", field,
		// 	"VALUE:", value,
		// 	"ITEMS:", items, items.filter(it => it[field] == value)
		// );
		if (value && (value == "*" || value == "")) {
			return items;
		}
    if (inverse) {
      return items.filter(it => it[field] !== value);
    }
    return items.filter(it => it[field] == value);
	}
}
