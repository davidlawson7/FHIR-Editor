import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FhirPrimitiveType } from '../datatypes/primitive-datatypes';

@Injectable()
export class QuestionControlService {
  constructor() { }

  toFormGroup(questions: any[]) {

    let group: any = {};
    questions.forEach(question => {

      if (question instanceof Array) {
        // Complex datatype, create new formgroup for it
        console.log(`Complex datatype: ${question[0]}`);
      } else {
        // Primitive datatype, convert element to FormControl
        console.log(`Primitive datatype: ${question.label}`)
        group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
          : new FormControl(question.value || '');
      }

    });
    return new FormGroup(group);
  }
}
