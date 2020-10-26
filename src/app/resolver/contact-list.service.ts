import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable()
export class ContactListResolver implements Resolve<any>  {
  constructor(private apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot) {

    return this.apiService.contactList();

  }
}
