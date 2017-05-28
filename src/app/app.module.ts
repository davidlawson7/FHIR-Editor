import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }          from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormQuestionComponent } from './form-question/form-question.component';
import { FhirService } from './fhir.service';

import { AppRoutingModule }     from './app-routing/app-routing.module';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormQuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [ FhirService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
