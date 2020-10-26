import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';

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
    private apiService: ApiService
    ) {
      this.editForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
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
    console.log(this.editForm.value);
    this.apiService.updateContact(this.editForm.value.id, this.editForm.value).then((data) => {
      this.router.navigate(['/']);
    });
  }

}
