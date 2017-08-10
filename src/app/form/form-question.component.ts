import { Component, Input, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { FhirPrimitiveType }          from '../datatypes/primitive-datatypes'

@Component({
  selector: 'df-question',
  templateUrl: './form-question.component.html'
})
export class FormQuestionComponent implements OnInit {
  @Input() question: FhirPrimitiveType<any>;
  @Input() form: FormGroup;
  get isValid() {
    //return this.form.controls[this.question.key].valid;
    return true;
  }

  ngOnInit() {
    console.log(`Processinging primitive: ${this.question.label}`)
  }
}
