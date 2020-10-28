import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Pipe({
  name: 'contactFilter'
})
export class ContactFilterPipe implements PipeTransform {

  transform(items: Array<Contact>, filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter((item: Contact) => {
      return item.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
        item.email.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
        item.phone.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    });
  }
}
