import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "../app.service";
import { BookFormSchema } from "../app.model";
declare const require: any;
var parseString = require('xml2js').parseString;

@Component({
  selector: 'app-read-xml',
  templateUrl: './read-xml.component.html',
  styleUrls: ['./read-xml.component.less']
})

export class ReadXmlComponent implements OnInit {
  public errorMessage = '';
  constructor(public appService: AppService, private router: Router) { }

  ngOnInit() {
    this.appService.clearPreviousXMLData();
  }

  readXMLFile(e: any) {
    let self = this;
    self.errorMessage = '';
    this.appService.clearPreviousXMLData();
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt: any) => {
      const xmlData: string = evt.target.result;
      console.log(xmlData);
      parseString(xmlData, function (err: any, result: any) {
        console.dir(result);
        if (err != null) {
          self.errorMessage = 'Error in file upload, .xml files are allowed.';
          return;
        }
        if (result.catalog.book.length) {
          result.catalog.book.forEach((book: any, index: number) => {
            let currentBook: BookFormSchema = {
              id: book.$.id,
              author: {
                firstname: book.author[0].firstname[0],
                lastname: book.author[0].lastname[0],
                gender: book.author[0].gender[0]
              },
              publication: {
                name: book.publication[0].name[0],
                website: book.publication[0].website[0],
                phone: book.publication[0].phone[0],
                email: book.publication[0].email[0],
                address: {
                  street: book.publication[0].address[0].street[0],
                  city: book.publication[0].address[0].city[0],
                  country: book.publication[0].address[0].country[0],
                  zip: book.publication[0].address[0].zip[0]
                }
              },
              title: book.title[0],
              genre: book.genre[0],
              price: book.price[0],
              publish_date: book.publish_date[0],
              description: book.description[0]
            }
            self.appService.catalog.push(currentBook);
            //self.router.navigate(['create-catalog']);
          });
        } else {
          self.errorMessage = "No catalog data found.";
        }
      });
    };
    reader.readAsText(file);
    console.log(reader.readAsText(file));
  }
  generateForm() {
    this.router.navigate(['create-catalog']);
  }
}
