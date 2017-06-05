import { Component, Input } from '@angular/core';

import { FhirService }                from '../fhir.service';
import { Session } from '../editor-objects/session';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  @Input() activeSession: Session;

  constructor() { }

}
