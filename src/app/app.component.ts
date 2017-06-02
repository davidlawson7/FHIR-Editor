import { Component } from '@angular/core';

import { FhirService } from './fhir.service';
import { Person } from './person';
import { QuestionService } from './question.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:  [QuestionService]
})
export class AppComponent {
  questions: any[];

  title = 'FHIR Editor';
  resourceType = '';
  resourceID = '';
  server = '';
  servers = ['http://fhirtest.uhn.ca/baseDstu3', 'http://fhirtest.uhn.ca/baseDstu2', 'http://ontoserver.csiro.au/stu3-latest'];
  types = ['Patient', 'Person', 'Practitioner'];
  searchby = ['Name', 'Description', 'ID', 'URL', 'Identifier', 'Version'];
  fhirServerNames = ['University Health Network - STU3', 'University Health Network - DSTU2', 'CSIRO ontoserver - STU3'];
  constructor(private fhirService: FhirService, service: QuestionService) {
    this.questions = service.getQuestions();
  }
  //constructor(service: QuestionService) {
//    this.questions = service.getQuestions();
 // }
}
