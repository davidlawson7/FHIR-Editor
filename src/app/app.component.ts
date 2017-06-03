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
  // General variables
  title = 'FHIR Editor';
  version = 'Alpha';
  versionNumber = '0.1';
  connectedServer = 'None';       // default value
  selectedResourceType = 'None';  // default value
  selectedSearchField = 'None';   // default value
  searchValue = '';

  // Required values
  servers = [
    ['University Health Network - STU3', 'http://fhirtest.uhn.ca/baseDstu3'],
    ['University Health Network - DSTU2', 'http://fhirtest.uhn.ca/baseDstu2'],
    ['CSIRO ontoserver - STU3', 'http://ontoserver.csiro.au/stu3-latest']
  ];
  types = ['Patient', 'Person', 'Practitioner'];
  fields = ['Name', 'Description', 'ID', 'URL', 'Identifier', 'Version'];

  // Saved resources
  savedResources = [
    ['Peter James Chalmers', 'Person', '35287'],
    ['Alex mate', 'Person', '35287']
  ];
  consolelog = ['Successful Request'];

  // Dynamic form variables
  questions: any[];

  constructor(private fhirService: FhirService, service: QuestionService) {
    //this.questions = service.getQuestions();
  }

}
