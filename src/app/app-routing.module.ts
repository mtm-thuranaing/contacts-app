import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { ContactAddComponent } from './pages/contact-add/contact-add.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';

import { ContactListResolver } from './resolver/contact-list.service'

const routes: Routes = [
  { path: '', redirectTo: '/contact-list', pathMatch: 'full' },
  { path: 'contact-list', component: ContactListComponent, resolve: { contactList: ContactListResolver } },
  { path: 'contact-add', component: ContactAddComponent, resolve: { contactList: ContactListResolver } },
  { path: 'contact-edit/:id', component: ContactEditComponent, resolve: { contactList: ContactListResolver } },
  { path: '**', redirectTo: '/contact-list', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ContactListResolver]
})
export class AppRoutingModule { }
