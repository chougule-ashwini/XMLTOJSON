import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BookFormSchema } from '../app.model';
import { AppService } from '../app.service';

import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-read-form',
  templateUrl: './read-form.component.html',
  styleUrls: ['./read-form.component.less']
})
export class ReadFormComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  constructor(public appService: AppService, private bookFormBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.appService.lastBookId = '';
    if (this.appService.selectedBooks.length)
      this.appService.getCatalogFormData(this.appService.selectedBooks);
    else
      this.appService.createCatalogForm();
  }

  getFormGroupAt(i: number) {
    return this.appService.bookArray.at(i) as FormGroup;
  }

  getCatalogJSON() {
    alert('Final JSON: ' + JSON.stringify(this.appService.bookArray.value));
  }

  addBookForm() {
    this.appService.bookArray.push(this.appService.addBookForm());
  }

  submitForm() {
    let formData: BookFormSchema[] = this.appService.bookArray.value;
    formData.forEach((book: BookFormSchema, index: number) => {
      let i = this.appService.catalog.findIndex((x: BookFormSchema) => x.id === formData[index].id);
      if (i > -1) {
        this.appService.catalog.splice(i, 1);
        this.appService.catalog.splice(i, 0, formData[index])
      } else
        this.appService.catalog.push(formData[index]);
    });
    this.appService.selectedBooks = [];
    this.router.navigate(['']);
  }
}
