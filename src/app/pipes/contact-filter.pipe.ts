import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {

  transform(items: any[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item) => {
      return item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
        item.email.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
        item.phone.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    });
  }

}
