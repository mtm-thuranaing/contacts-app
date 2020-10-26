import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactListComponent } from './pages/contact-list/contact-list.component';


const routes: Routes = [
  { path: '', component: ContactListComponent },
  { path: 'contact-list', component: ContactListComponent },
  { path: '**', redirectTo: '/contact-list', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
