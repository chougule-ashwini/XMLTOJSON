import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-read-form',
  templateUrl: './read-form.component.html',
  styleUrls: ['./read-form.component.less']
})
export class ReadFormComponent implements OnInit {
  constructor(public appService: AppService, private bookFormBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (this.appService.catalog.length)
      this.appService.getCatalogFormData(this.appService.catalog);
    else
      this.appService.createCatalogForm();
  }

  getFormGroupAt(i: number) {
    return this.appService.bookArray.at(i) as FormGroup;
  }

  getCatalogJSON() {
    alert('Final JSON: ' + JSON.stringify(this.appService.bookArray.value));
  }
}
