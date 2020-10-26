import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpParameterCodec } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected apiEndpoint: string = environment.apiEndpoint;
  private httpOptions: any = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    )
  };

  constructor(
    public http: HttpClient,
  ) { }

  public contactList(): Promise<any> {
    return this.http.get(this.apiEndpoint + '/contacts', this.httpOptions).toPromise();
  }

  public contactById(id: string): Promise<any> {
    return this.http.get(this.apiEndpoint + `/contacts/${id}`, this.httpOptions).toPromise();
  }

  public createContact(body): Promise<any> {
    return this.http.post(this.apiEndpoint + '/contacts', body, this.httpOptions).toPromise();
  }

  public updateContact(id: string, body): Promise<any> {
    return this.http.put(this.apiEndpoint + `/contacts/${id}`, body, this.httpOptions).toPromise();
  }

  public deleteContact(id: string): Promise<any> {
    return this.http.delete(this.apiEndpoint + `/contacts/${id}`, this.httpOptions).toPromise();
  }

}
