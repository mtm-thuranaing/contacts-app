import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  public contactId: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.contactId = this.route.snapshot.params.id;
  }

}
