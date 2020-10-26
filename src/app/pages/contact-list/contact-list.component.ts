import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public contactList: [];
  public filterValue: string;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(data => {
     this.contactList = data.contactList;
    });
  }

  getContactlist() {
    this.apiService.contactList().then((data) => {
      console.log(data);
      this.contactList = data;
    });
  }

  deleteModal(id: string) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.title = 'Delete';

    modalRef.result.then((result) => {
      console.log(result, 'result');
      this.apiService.deleteContact(id).then(() => {
        this.getContactlist();
      });
    }, (reason) => {
      console.log(reason, 'reason');
    });
  }

  editContact(id: string) {
    this.router.navigate(['/contact-edit', id]);
  }

}
