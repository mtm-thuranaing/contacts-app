import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Contact } from '../interfaces/contact';
import { ModalComponent } from '../components/modal/modal.component';

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
    private modalService: NgbModal
  ) { }

  public contactList(): Promise<any> {
    return this.http.get(this.apiEndpoint + '/contacts', this.httpOptions).toPromise();
  }

  public contactById(id: string): Promise<any> {
    return this.http.get(this.apiEndpoint + `/contacts/${id}`, this.httpOptions).toPromise();
  }

  public createContact(body: Contact): Promise<any> {
    return this.http.post(this.apiEndpoint + '/contacts', body, this.httpOptions).toPromise();
  }

  public updateContact(id: string, body: Contact): Promise<any> {
    return this.http.put(this.apiEndpoint + `/contacts/${id}`, body, this.httpOptions).toPromise();
  }

  public deleteContact(id: string): Promise<any> {
    return this.http.delete(this.apiEndpoint + `/contacts/${id}`, this.httpOptions).toPromise();
  }

  async errorHandler(error: any) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.title = 'Error';
    if (error.status === 0) {
      modalRef.componentInstance.body = 'Cannot connect to server.';
    } else if (error.status === 500) {
      modalRef.componentInstance.body = 'Internal Server Error.';
    } else if (error.status === 404) {
      modalRef.componentInstance.body = '404 (Not found).';
    }
  }
}
