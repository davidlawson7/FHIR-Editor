import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }   from '@angular/core';
import { ActivatedRoute, Params }     from '@angular/router';
import { Location }                   from '@angular/common';
import { FormGroup }                  from '@angular/forms';
import { Session } from '../editor-objects/session';

import { FhirService }                from '../services/fhir.service';
import { QuestionControlService }    from '../services/question-control.service';
import { FhirPrimitiveType }          from '../datatypes/primitive-datatypes';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [QuestionControlService]
})
export class FormComponent implements OnInit {

  @Input() activeSession: Session;
  @Input() questions: any[] = [];
  @Input() existingData: {};
  form: FormGroup;
  payLoad = '';
  currentFields: string[] = [];
  fieldToAdd: string = '';

  constructor(
    private fhirService: FhirService,
    private qcs: QuestionControlService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    //this.form = this.qcs.toFormGroup(this.questions);
  }

  ngOnChanges() {

    if (this.questions != null) {
      if (this.existingData != null) {
        //this.questions = this.existingData;
        this.transformResource();
      }
      this.form = this.qcs.toFormGroup(this.questions);
      console.log(this.form);
      for (let question of this.questions) {
        console.log(question);
      }
    }
  }

  transformResource() {
    let field = this.questions[0];
    Object.keys(this.existingData).forEach(key => {
      // Create form elements
      if (key != 'meta' && key != 'identifier' && key != 'resourceType') {
        console.log(`Key: ${key}`);
        console.log(`Creating field: ${key}, value: ${this.existingData[key]}`)
        let obj: any[] = this.fhirService.createResourceField(field, key, this.currentFields);
        console.log("The object");
        console.log(obj);
        console.log(this.existingData[key]);
        console.log(key);
        // add value to obj
        if (obj instanceof Array) {
          if (obj[0] instanceof FhirPrimitiveType) {
            // Primitive datatype
            obj[0].value = this.existingData[key];
          } else if (obj[0] instanceof Array) {
            // Complex type
            this.transformComplex(obj[0], this.existingData[key]);
          } else if (obj instanceof String) {
            // ignore

          }
        }
        this.questions.push(obj[0]);

      }
    });
    if (this.questions != null) {
      // Convert into formgroup
      this.form = this.qcs.toFormGroup(this.questions);
      console.log(this.form);
      // Add values to question
    }

  }

  transformComplex(questions: any[], data: any[]) {

    for (let question of questions) {
      if (question[0] instanceof FhirPrimitiveType) {
        // Primitive datatype
        //question[0].value = this.existingData[key];
      } else if (question[0] instanceof Array) {
        // Complex type
        //this.transformComplex(question[0], this.existingData[key]);
      } else if (question instanceof String) {
        // ignore

      }
    }
  }

  addResourceField() {
    // Tick this field of the list of possible fields
    //this.currentFields.push(this.fieldToAdd);
    console.log(`damn field`);
    console.log(this.fieldToAdd);
    let obj: any[] = this.fhirService.createResourceField(this.questions[0], this.fieldToAdd, this.currentFields);
    console.log(obj);
    this.questions.push(obj[0]);
    console.log(this.questions);
    if (this.questions != null) {
      this.form = this.qcs.toFormGroup(this.questions);
      console.log(this.form);
      for (let question of this.questions) {
        console.log(question);
      }
    }
  }

  public getResourceFields() {
    let fields = this.fhirService.getResourceFields(this.questions[0]);
    // Iterates through list of already existing fields
    for (let field in this.currentFields) {
      console.log(`WORKING ON FIELD: ${field}`);
      let index = fields.indexOf(field, 0);
      if (index > -1) {
        // Removes field from list if it exists already and is maxed
        fields.splice(index, 1);
        console.log(`Removing the field: ${field}`);
      }
    }
    return fields;
  }

  isArray(obj: any) {
    return Array.isArray(obj)
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }

  goBack(): void {
    this.location.back();
  }

}
