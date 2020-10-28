import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { ApiService } from '../../services/api.service';
import { Contact } from '../../interfaces/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public contactList: Array<Contact>;
  public filterValue: string;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data: any) => {
      this.contactList = data.contactList;
    });
  }

  getContactlist() {
    this.apiService.contactList().then((data: Array<Contact>) => {
      this.contactList = data;
    }).catch(err => {
      this.apiService.errorHandler(err);
    });
  }

  deleteModal(id: string) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.title = 'Delete';
    modalRef.componentInstance.body = 'Are you sure to delete?';
    modalRef.componentInstance.type = 'delete';

    modalRef.result.then((result: any) => {
      this.apiService.deleteContact(id).then(() => {
        this.getContactlist();
      }).catch(err => {
        this.apiService.errorHandler(err);
      });
    }, (err) => {});
  }

  editContact(id: string) {
    this.router.navigate(['/contact-edit', id]);
  }

}
