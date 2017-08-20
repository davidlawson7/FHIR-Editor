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
    console.log(this.questions);
    if (this.questions != null) {
      this.form = this.qcs.toFormGroup(this.questions);
      console.log(this.form);
      for (let question of this.questions) {
        console.log(question);
      }
    }
  }

  addResourceField() {
    // Tick this field of the list of possible fields
    this.currentFields.push(this.fieldToAdd);
    console.log(`damn field`);
    console.log(this.fieldToAdd);
    let obj: any[] = this.fhirService.createResourceField(this.questions[0], this.fieldToAdd);
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
    return this.fhirService.getResourceFields(this.questions[0]);
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
