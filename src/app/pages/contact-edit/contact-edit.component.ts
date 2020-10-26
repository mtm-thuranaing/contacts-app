import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../services/api.service';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  public contactList: [];
  public editForm: FormGroup;
  public contact: {};
  public contactId: string;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private modalService: NgbModal,
  ) {
    this.editForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11)]),
    });
  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(data => {
      this.contactList = data.contactList;
      console.log(this.contactList);
    });
    this.contactId = this.activeRoute.snapshot.params.id;
    this.apiService.contactById(this.contactId).then((data) => {
      this.editForm.patchValue(data);
    });
  }

  editContact() {
    const checkExist = this.contactList.filter((item: any) => {
      return item.email === this.editForm.get('email').value || item.phone === this.editForm.get('phone').value;
    });
    if (checkExist.length > 0) {
      const modalRef = this.modalService.open(ModalComponent, { centered: true });
      modalRef.componentInstance.title = 'Edit';
      modalRef.componentInstance.body = 'The contact already exists!';
    } else {
      this.apiService.updateContact(this.editForm.value.id, this.editForm.value).then((data) => {
        this.router.navigate(['/']);
      });
    }
  }

}
