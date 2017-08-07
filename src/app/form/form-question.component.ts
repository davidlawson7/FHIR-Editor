import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup }        from '@angular/forms';

import { FhirPrimitiveType }          from '../datatypes/primitive-datatypes'

@Component({
  selector: 'df-question',
  templateUrl: './form-question.component.html'
})
export class FormQuestionComponent {
  @Input() question: FhirPrimitiveType<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }
}
