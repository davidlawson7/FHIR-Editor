import { Component, Input } from '@angular/core';

import { FhirService }                from '../fhir.service';
import { Session } from '../editor-objects/session';
import { SavedResource } from '../editor-objects/saved-resource';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  @Input() activeSession: Session;
  @Input() savedResources: SavedResource[];

  constructor(private fhirService: FhirService) {

  }

}
