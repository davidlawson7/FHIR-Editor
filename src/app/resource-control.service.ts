import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FhirPrimitiveType } from './primitive-datatypes';

@Injectable()
export class ResourceControlService {

  constructor() { }

  public toFormGroup(questions: any[]) {
    console.log("======================================================");
    console.log(questions);
    let group: any = {};
    questions.forEach((question, index) => {

      if (index == 0) {

      } else if (question instanceof Array) {
        // Complex datatype, create new formgroup for it
        //console.log(`Complex datatype: ${question[0]}`);
        this.complexDatatypeFormGroup(question, group);
      } else {
        // Primitive datatype, convert element to FormControl
        //console.log(`${question.label}`)
        if (question != undefined) {
          group[`_${question.label}`] = question.required ? new FormControl(question.value || '', Validators.required)
            : new FormControl(question.value || '');
        } else {
          console.log(`Wadda dupa dup dup!!!!`);
          console.log(question);
        }
      }

    });
    return new FormGroup(group);
  }

  private complexDatatypeFormGroup(complexDatatype: any[], parentGroup: any) {

    let group: any = {};
    complexDatatype.forEach((question, index) => {

      if (index == 0 || index == 1) {

      } else if (question instanceof Array) {
        // Complex datatype, create new formgroup for it
        console.log(`Found a Complex datatype: ${question[0]}`);
        this.complexDatatypeFormGroup(question, group);
      } else {
        // Primitive datatype, convert element to FormControl
        if (question != undefined) {
          //console.log(`Primitive datatype: ${question.label}`)
          group[`_${question.label}`] = question.required ? new FormControl(question.value || '', Validators.required)
            : new FormControl(question.value || '');
        } else {
          console.log(`CHECK OUT THIS ISSUES DAVID`);
          console.log(question);
        }
      }

    });
    // Create a new formgroup for the complex type and store it in the parent
    parentGroup[complexDatatype[1]] = new FormGroup(group);
  }

}
