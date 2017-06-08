import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }   from '@angular/core';
import { ActivatedRoute, Params }     from '@angular/router';
import { Location }                   from '@angular/common';
import { FormGroup }                  from '@angular/forms';
import { Session } from '../editor-objects/session';

import { FhirService }                from '../fhir.service';
import { FhirPrimitiveType }          from '../datatypes/primitive-datatypes'
import { QuestionBase }               from '../question-base';
import { QuestionControlService }     from '../question-control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ QuestionControlService ]
})
export class FormComponent implements OnInit {

  @Input() activeSession: Session;
  form: FormGroup;
  payLoad = '';

  /* Dynamic form */
  @Input() questions: QuestionBase<any>[] = [];

  constructor(
    private fhirService: FhirService,
    private route: ActivatedRoute,
    private location: Location,
    private qcs: QuestionControlService
  )
  { }

  ngOnInit(): void {

    //this.form = this.qcs.toFormGroup(this.questions);
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }

}
