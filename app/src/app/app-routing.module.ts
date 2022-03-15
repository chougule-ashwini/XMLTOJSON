import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadFormComponent } from './read-form/read-form.component';
import { ReadXmlComponent } from './read-xml/read-xml.component';

const routes: Routes = [
  {
    path: '',
    component: ReadXmlComponent,
  },
  {
    path: 'create-catalog',
    component: ReadFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
