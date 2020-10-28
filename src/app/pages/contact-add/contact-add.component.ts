import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../../services/api.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { Contact } from '../../interfaces/contact';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {
  public contactList: Array<Contact>;
  public addForm: FormGroup;
  public contact: {};
  public contactId: string;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private modalService: NgbModal,
  ) {
    this.addForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      phone: new FormControl('', [Validators.required, Validators.minLength(11), Validators.pattern('^((\\+95-?)|0)?[0-9]{10}$')])
    });
  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe((data: any) => {
      this.contactList = data.contactList;
    });
  }

  addContact() {
    const checkExist = this.contactList.filter((item: Contact) => {
      return item.email === this.addForm.get('email').value || item.phone === this.addForm.get('phone').value;
    });
    if (checkExist.length > 0) {
      const modalRef = this.modalService.open(ModalComponent, { centered: true });
      modalRef.componentInstance.title = 'Add';
      modalRef.componentInstance.body = 'The contact already exists!';
    } else {
      const id = this.contactList.length === 0 ? '1' : String(+this.contactList[this.contactList.length - 1].id + 1)
      this.addForm.patchValue({id});
      this.apiService.createContact(this.addForm.value).then((data) => {
        this.router.navigate(['/']);
      }).catch(err => {
        this.apiService.errorHandler(err);
      });
    }
  }
}
