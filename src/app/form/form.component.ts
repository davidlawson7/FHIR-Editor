import 'rxjs/add/operator/switchMap';
import { Component, Input, OnInit }   from '@angular/core';
import { ActivatedRoute, Params }     from '@angular/router';
import { Location }                   from '@angular/common';
import { FormGroup }                  from '@angular/forms';
import { Session } from '../editor-objects/session';

import { FhirService }                from '../services/fhir.service';
import { FhirPrimitiveType }          from '../datatypes/primitive-datatypes'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() activeSession: Session;
  form: FormGroup;
  payLoad = '';

  /* Dynamic form */


  constructor(
    private fhirService: FhirService,
    private route: ActivatedRoute,
    private location: Location
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
