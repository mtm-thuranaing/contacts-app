import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { ContactAddComponent } from './pages/contact-add/contact-add.component';


const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'contact-list', component: ContactListComponent },
  { path: 'contact-add', component: ContactAddComponent },
  { path: '**', redirectTo: '/contact-list', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
