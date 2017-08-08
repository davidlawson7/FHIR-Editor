import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FhirPrimitiveType } from '../datatypes/primitive-datatypes';

@Injectable()
export class QuestionControlService {
  constructor() { }

  public toFormGroup(questions: any[]) {

    let group: any = {};
    questions.forEach(question => {

      if (question instanceof Array) {
        // Complex datatype, create new formgroup for it
        //console.log(`Complex datatype: ${question[0]}`);
        this.complexDatatypeFormGroup(question, group);
      } else {
        // Primitive datatype, convert element to FormControl
        //console.log(`Primitive datatype: ${question.label}`)
        group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
          : new FormControl(question.value || '');
      }

    });
    return new FormGroup(group);
  }

  private complexDatatypeFormGroup(complexDatatype: any[], parentGroup: any) {

    let group: any = {};
    complexDatatype.forEach(question => {

      if (question instanceof Array) {
        // Complex datatype, create new formgroup for it
        //console.log(`Complex datatype: ${question[0]}`);
        this.complexDatatypeFormGroup(question, group);
      } else {
        // Primitive datatype, convert element to FormControl
        //console.log(`Primitive datatype: ${question.label}`)
        group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
          : new FormControl(question.value || '');
      }

    });
    // Create a new formgroup for the complex type and store it in the parent
    parentGroup[complexDatatype[0]] = new FormGroup(group);
  }
}