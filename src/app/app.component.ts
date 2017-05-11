import { Component } from '@angular/core';

import { FhirService } from './fhir.service';
import { Person } from './person';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FHIR Editor';
  resourceType = '';
  resourceID = '';
  server = '';
  servers = ['http://fhirtest.uhn.ca/baseDstu3', 'http://fhirtest.uhn.ca/baseDstu2', 'http://ontoserver.csiro.au/stu3-latest'];
  fhirServerNames = ['University Health Network - STU3', 'University Health Network - DSTU2', 'CSIRO ontoserver - STU3'];
  constructor(private fhirService: FhirService) { }

}
