import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule }          from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormQuestionComponent } from './form/form-question.component';
import { FhirService } from './services/fhir.service';

import { AppRoutingModule }     from './app-routing/app-routing.module';
import { SideNavComponent } from './nav/side-nav.component';
import { TopNavComponent } from './nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';
import { FormGroupComponent } from './form/form-group.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormQuestionComponent,
    SideNavComponent,
    TopNavComponent,
    FooterComponent,
    FormGroupComponent,
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
