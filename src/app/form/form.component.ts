import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }   from '@angular/core';
import { ActivatedRoute, Params }     from '@angular/router';
import { Location }                   from '@angular/common';
import { FormGroup }                  from '@angular/forms';

import { FhirService }                from '../fhir.service';
import { Person }                     from '../person';
import { QuestionBase }               from '../question-base';
import { QuestionControlService }     from '../question-control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ QuestionControlService ]
})
export class FormComponent implements OnInit {

  /* The person we are editing */
  person: Person;

  /* Dynamic form */
  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';

  constructor(
    private fhirService: FhirService,
    private route: ActivatedRoute,
    private location: Location,
    private qcs: QuestionControlService
  )
  { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.fhirService.getResource(params['id'], params['resource'], params['server']))
      .subscribe(person => this.person = person);
    //this.form = this.qcs.toFormGroup(this.questions);
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }

}
