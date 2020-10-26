import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ContactComponent } from './pages/contact/contact.component';

const routes: Routes = [
  { path: '', component: ContactComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/contact', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
