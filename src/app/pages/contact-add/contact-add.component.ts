import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.css']
})
export class ContactAddComponent implements OnInit {
  public contactList: [];
  public addForm: FormGroup;
  public contact: {};
  public contactId: string;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private apiService: ApiService
    ) {
      this.addForm = new FormGroup({
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
  }

  addContact() {
    this.apiService.createContact(this.addForm.value).then((data) => {
      this.router.navigate(['/']);
    });
  }

}
