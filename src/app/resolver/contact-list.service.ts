import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Contact } from '../interfaces/contact';

@Injectable()
export class ContactListResolver implements Resolve<Array<Contact>> {
  constructor(private apiService: ApiService) { }

  async resolve(route: ActivatedRouteSnapshot) {
    try {
      const data: Array<Contact> = await this.apiService.contactList();
      return data;
    } catch (err) {
      this.apiService.errorHandler(err);
      return [];
    }
  }
}
