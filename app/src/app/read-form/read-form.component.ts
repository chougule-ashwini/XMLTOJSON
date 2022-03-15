import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-read-form',
  templateUrl: './read-form.component.html',
  styleUrls: ['./read-form.component.less']
})
export class ReadFormComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit(): void {
    if (this.appService.catalog.length)
      this.appService.getCatalogFormData(this.appService.catalog);
  }
}
