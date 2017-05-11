import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { FhirService } from '../fhir.service';
import { Person } from '../person';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  /* The person we are editing */
  person: Person;

  constructor(
    private fhirService: FhirService,
    private route: ActivatedRoute,
    private location: Location
  )
  { }

  ngOnInit(): void {
    this.route.params
      .switchMap((params: Params) => this.fhirService.getResource(params['id'], params['resource'], params['server']))
      .subscribe(person => this.person = person);
  }

  goBack(): void {
    this.location.back();
  }

}
