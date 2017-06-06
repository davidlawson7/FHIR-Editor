import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {SelectModule} from 'ng-select';


import { FhirService }                from '../fhir.service';
import { Session } from '../editor-objects/session';
import { SavedResource } from '../editor-objects/saved-resource';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  data: any[];
  @Input() activeSession: Session;
  @Input() savedResources: SavedResource[];

  form: FormGroup;
  multiple0: boolean = false;

  @ViewChild('preSingle') preSingle;

  constructor(private fhirService: FhirService) {

  }

  update() {
    console.log("did it update");
    this.data = this.activeSession.availableTypes;
  }

  ngOnInit() {
        this.form = new FormGroup({});
        this.form.addControl('selectSingle', new FormControl(''));
    }

  onSingleOpened() {
    console.log("opened single");
  }

  onSingleClosed() {
    console.log("closed single");
  }

  onSingleSelected(item) {
    this.activeSession.selectedResourceType = item.value;
    console.log(`selected ${item.value}`);
  }

  onSingleDeselected(item) {
    this.activeSession.selectedResourceType = null;
  }
}
