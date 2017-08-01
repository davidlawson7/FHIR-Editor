import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup }        from '@angular/forms';

@Component({
  selector: 'df-question',
  templateUrl: './form-question.component.html'
})
export class FormQuestionComponent {
  @Input() question: any;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.question.key].valid; }

  @ViewChild('secondaryBlock')
  secondaryBlock: TemplateRef<any>|null = null;
}
