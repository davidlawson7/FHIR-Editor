import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }          from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SelectModule} from 'ng-select';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormQuestionComponent } from './form-question/form-question.component';
import { FhirService } from './fhir.service';

import { AppRoutingModule }     from './app-routing/app-routing.module';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';
import { FontColorDirective } from './font-color.directive';
import { FormGroupComponent } from './form-group/form-group.component';

// Imports for loading & configuring the in-memory web api
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService }  from './in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormQuestionComponent,
    SideNavComponent,
    TopNavComponent,
    FooterComponent,
    FontColorDirective,
    FormGroupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    BrowserAnimationsModule,
    AppRoutingModule,
    SelectModule
  ],
  providers: [ FhirService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
