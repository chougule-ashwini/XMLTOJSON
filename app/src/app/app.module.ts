import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReadXmlComponent } from './read-xml/read-xml.component';
import { ReadFormComponent } from './read-form/read-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadXmlComponent,
    ReadFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
