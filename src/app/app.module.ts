import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SelectModule } from 'ng2-select';

import { AppComponent } from './app.component';
import { Tabs } from './tabs/tabs.component';
import { Tab } from './tab/tab.component';
import { FormComponent } from './form/form.component';
import { PrimitiveElementComponent } from './primitive-element/primitive-element.component';
import { ComplexElementComponent } from './complex-element/complex-element.component';

@NgModule({
  declarations: [
    AppComponent,
    Tabs,
    Tab,
    FormComponent,
    PrimitiveElementComponent,
    ComplexElementComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    SelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
