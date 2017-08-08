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
  @Input() questions: FhirPrimitiveType<any>[] = [];
  form: FormGroup;
  payLoad = '';

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
      this.form = this.qcs.toFormGroup(this.questions);
      //console.log(this.form);
    }
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
  }

  goBack(): void {
    this.location.back();
  }

}
