import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Session } from './session';
import { FhirService } from './fhir.service';

import { SelectModule  } from 'ng2-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FhirService]
})
export class AppComponent {
  /* App Property variables */
  public title = 'FHIR EDITOR v2';
  public capabilityStatement: any = {};
  public endpoints = ['http://vonk.furore.com'];
  public availableTypes = [];
  public availablefields = [];
  public resourceStructureDefinitons = [];
  public datatypeStructureDefinitions = [];
  public newEndpointVariable: string = '';
  public newEndpointTestResult: string = '';

  /* App search/create form variables */
  public activeEndpoint = '';
  public searchResourceType: any = {};
  public searchField: any = {};
  public searchValue = '';
  public searchResults: any[] = [];
  public selectedSearchItem: any;
  public createResourceType: any = {};

  /* Other variables */
  public complexTypes = [
    'Attachment', 'Coding', 'CodeableConcept', 'Quantity', 'Range', 'Ratio',
    'Period', 'SampledData', 'Identifier', 'HumanName', 'Address',
    'ContactPoint', 'Timing', 'Signature', 'Annotation', 'Meta', 'Narrative',
    'BackboneElement'
  ];
  private _disabledV: string = '0';
  private disabled: boolean = false;
  public resourceBuilt: boolean = false;
  public resourceElements: any[]; // Holds the form built from structure defs
  public existingResourceData: any; // Holds pre-existing resource data

  constructor(private fhirService: FhirService) { }

  public updateEndpoint(endpoint: string) {
    this.fhirService.updateService(endpoint);
    this.fhirService.getCapabilityStatement(endpoint)
      .subscribe(
      // Update capability statement
      capabilityStatement => {
        this.capabilityStatement = capabilityStatement;
        this.availableTypes.length = 0;
        this.availablefields.length = 0;
        this.resourceStructureDefinitons.length = 0;

        for (let rest of capabilityStatement.rest) {
          for (let resource of rest.resource) {
            this.availableTypes.push(resource.type.toString());
          }
        }

        // Store each resources structure definition
        for (let resource of this.availableTypes) {
          this.fhirService.getStructureDefinition(resource, endpoint)
            .subscribe(
            // Store structure definition
            structureDefinition => {
              this.resourceStructureDefinitons.push(structureDefinition);
            },
            error => {
              console.log(error);
            }
            );
        }

        // Store each complex datatypes structure definition
        for (let datatype of this.complexTypes) {
          this.fhirService.getStructureDefinition(datatype, endpoint)
            .subscribe(
            // Store the datatype in the session
            structureDefinition => {
              this.datatypeStructureDefinitions.push(structureDefinition);
            },
            error => {
              console.log(error);
            }
            );
        }
      },
      error => {
        console.log(error)
      });
  }

  public verifyEndpoint() {
    this.fhirService.getCapabilityStatement(this.newEndpointVariable)
      .subscribe(
      capabilityStatement => {
        if (capabilityStatement.hasOwnProperty('resourceType') && capabilityStatement.resourceType == 'CapabilityStatement') {
          this.newEndpointTestResult = 'ok';
        } else {
          this.newEndpointTestResult = 'bad endpoint';
        }
      },
      error => {
        this.newEndpointTestResult = 'bad endpoint';
      }
      );
  }

  public addEndpoint() {
    this.endpoints.push(this.newEndpointVariable);
    this.newEndpointVariable = '';
    this.newEndpointTestResult = '';
  }

  public createResource() {
    this.resourceElements = this.fhirService.createResource(this.createResourceType.text);
    console.log(this.resourceElements);
    this.resourceBuilt = true;
  }

  public closeResource() {
    this.resourceBuilt = false;
    this.resourceElements = null;
    this.existingResourceData = null;
  }

  public clearSession() {
    this.closeResource();
    this.capabilityStatement = null;
    this.availableTypes = [];
    this.availablefields = [];
    this.resourceStructureDefinitons = [];
    this.datatypeStructureDefinitions = [];
    this.newEndpointVariable = '';
    this.newEndpointTestResult = '';
    this.activeEndpoint = '';
    this.searchResourceType = {};
    this.searchField = {};
    this.searchValue = '';
    this.createResourceType = {};
    this._disabledV = '0';
    this.disabled = false;
  }

  public searchForResources() {
    this.searchResults.length = 0;
    this.fhirService.search(this.activeEndpoint,
      this.searchResourceType.text,
      this.searchField.text,
      this.searchValue)
      .subscribe(
      bundle => {
        // When we get back a an object
        for (let entity of bundle.entry) {
          console.log(entity);
          if (entity.resource.resourceType != 'OperationOutcome') {
            this.searchResults.push(entity);
          }
        }
      },
      error => { console.log(error) }
      );
  }

  public grabSearchResult(object: {}) {
    this.selectedSearchItem = object;
    console.log(this.selectedSearchItem);
  }

  public pullResourceCreateForm() {
    console.log("====== begin pulling data test ======");
    console.log(`Create resource type: ${this.selectedSearchItem.resource.resourceType}`);
    console.log(`The item: ${this.selectedSearchItem.fullUrl}`);
    this.resourceElements = this.fhirService.createResource(this.searchResourceType.text);
    console.log(this.resourceElements);
    this.fhirService.getExistingResourceFromSearch(this.selectedSearchItem.fullUrl)
      .subscribe(
      existingResource => {
        this.existingResourceData = existingResource;
        console.log("====== aaaaaaaa ======");
        console.log(this.existingResourceData);
        console.log(this.resourceElements);
        this.resourceBuilt = true;
      }
      );

  }
  /*****************************************************************************
   * HTML Form specific functions
   ****************************************************************************/
  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public refreshSearchResourceTypeValue(value: any): void {
    this.searchResourceType = value;
  }

  public removeSearchResourceTypeValue(value: any): void {
    this.availablefields.length = 0;
  }
  public refreshSearchFieldValue(value: any): void {
    this.searchField = value;
  }

  public refreshCreateResourceTypeValue(value: any): void {
    this.createResourceType = value;
  }

  public updateSearchParam(resourceType) {
    console.log("Updating search param");
    this.availablefields.length = 0;
    for (let rest of this.capabilityStatement.rest) {
      for (let resource of rest.resource) {
        if (resource.type == resourceType.text) {
          console.log(`Found type: ${resource.type}`);
          for (let searchParam of resource.searchParam) {
            this.availablefields.push(searchParam.name);
          }
          return;
        } else {
          continue;
        }
      }
    }
  }
}
