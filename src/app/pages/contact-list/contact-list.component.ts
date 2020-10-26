import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../components/modal/modal.component';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.title = 'Delete';

    modalRef.result.then((result) => {
      console.log(result, 'result');
    }, (reason) => {
      console.log(reason, 'reason');
    });
  }

}
