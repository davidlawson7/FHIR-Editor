import { Component } from '@angular/core';

import { FhirService } from './services/fhir.service';
import { Session } from './editor-objects/session';
import { Log } from './editor-objects/log';

import { SavedResource } from './editor-objects/saved-resource';
import { FhirEndpoint } from './editor-objects/fhir-endpoint';

import {
  FhirBoolean, FhirInteger, FhirString, FhirDecimal, FhirUri,
  FhirBase64Binary, FhirInstant, FhirDate, FhirDateTime, FhirTime, FhirCode,
  FhirOid, FhirId, FhirMarkdown, FhirUnsignedInt, FhirPositiveInt
} from './datatypes/primitive-datatypes'; // ALL primitive datatypes

import {
  Attachment, Coding, CodeableConcept, Quantity, Range, Ratio, Period,
  SampledData, Identifier, HumanName, Address, ContactPoint, Timing, Signature,
  Annotation, Meta, Reference, Link, Text
} from './datatypes/complex-datatypes'; // ALL complex datatypes

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FhirService]
})
export class AppComponent {
  // Variables
  title: string;
  version: string;
  versionNumber: string;
  activeSession: Session;

  sessions: Session[];
  savedResources: SavedResource[];
  availableEndpoints: FhirEndpoint[];
  selectedSearchItem: any;
  resourceData: any;

  // Dynamic form variables
  questions: any[];

  constructor(private fhirService: FhirService) {
    //this.questions = service.getQuestions();
    // General variables
    this.title = 'FHIR Editor';
    this.version = 'Alpha';
    this.versionNumber = '0.0.1';
    // The list of sessions. Always must have one session
    this.sessions = [new Session('Test')];
    this.activeSession = this.sessions[0];
    // All the saved resources on this editor
    this.savedResources = [
      new SavedResource('35287', 'Person', 'http://fhirtest.uhn.ca/baseDstu3', 'Peter James Chalmers')
    ];
    // All the possible servers to start with
    this.availableEndpoints = [
      new FhirEndpoint('University Health Network - STU3', 'http://fhirtest.uhn.ca/baseDstu3'),
      new FhirEndpoint('University Health Network - DSTU2', 'http://fhirtest.uhn.ca/baseDstu2'),
      new FhirEndpoint('CSIRO ontoserver - STU3', 'http://ontoserver.csiro.au/stu3-latest'),
      new FhirEndpoint('Furore Spark - DSTU2/1?', 'http://spark.furore.com/fhir'),
      new FhirEndpoint('Furore Vonk - STU3', 'http://vonk.furore.com')
    ];
  }

  /* used */
  updateSessionCapabilityStatement(endpoint: string) {
    let complexTypes: string[] = [
      'Attachment', 'Coding', 'CodeableConcept', 'Quantity', 'Range', 'Ratio',
      'Period', 'SampledData', 'Identifier', 'HumanName', 'Address',
      'ContactPoint', 'Timing', 'Signature', 'Annotation', 'Meta', 'Narrative',
      'BackboneElement'
    ];
    this.fhirService.getCapabilityStatement(endpoint)
      .subscribe(
      any => {
        // Store capability statement in session
        this.activeSession.capabilityStatement = any;
        this.activeSession.general.capabilityStatement = any;
        //console.log(this.activeSession.capabilityStatement);
        this.activeSession.log.info("Successfully updated Capability Statement.");

        // Update sessions available resources
        this.updateSessionAvailableResources(this.activeSession);
        // For each resource, grab its structure definition
        for (let resourceType of this.activeSession.general.availableTypes) {
          this.fhirService.getStructureDefinition(resourceType.value, endpoint)
            .subscribe(
            any => {
              // Store data in the session
              let length: number = this.activeSession.general.resourceDefinitions.push(any);
              // log it in the browser and app consoles
              //console.log(this.activeSession.general.resourceDefinitions[length - 1]);
              this.activeSession.log.info(`Successfully pulled ${resourceType} StructureDefinition`)
            },
            error => {
              this.activeSession.log.error("Something went wrong with Structure Definition")
              this.activeSession.settingsResourceStructure = "error";
            }
            );
        }
        // For each complex datatype, go grab it
        for (let datatype of complexTypes) {
          this.fhirService.getStructureDefinition(datatype, endpoint)
            .subscribe(
            any => {
              // Store the datatype in the session
              this.activeSession.general.complexDatatypeDefinitions.push(any);
              // Log it
              //console.log(`Grabbed the complex type ${datatype}`);
            },
            error => {
              console.log(`Couldnt grab the datatype ${datatype}`);
            }
            );
        }

      },
      error => this.activeSession.log.error("Something went wrong with Capability Statement"));
  }

  logActiveObject() {
    console.log(this.activeSession.activeObject);
  }

  public generateFormGroupTest() {
    console.log("====== begin formgroup test ======");
    this.questions = this.fhirService.createResource(this.activeSession.createResourceType);
    console.log(this.questions);
    this.activeSession.built = true;
  }
  /* used */
  public updateEndpoint(newEndpoint: string) {
    // Grab new capabilityStatement
    this.updateSessionCapabilityStatement(newEndpoint);
    this.fhirService.updateService(newEndpoint);
  }

  /* used */
  updateSessionAvailableResources(session: any) {
    // Empty the old array
    let t = session.general.availableTypes;
    t.length = 0;

    // Rest object is a array, so go through each one
    for (let rest of session.general.capabilityStatement.rest) {
      // Resource object is a array, so go through each one
      for (let resource of rest.resource) {
        let obj = {
          value: resource.type.toString(),
          label: resource.type.toString()
        };
        t.push(obj);
      }
    }
    //console.log(t);
    this.activeSession.log.info("Successfully updated Resource Type list.");
  }

  /* used */
  public getStructureDefinition(resourceType: string, endpoint: string) {
    // Destroy the old structure definition
    this.activeSession.canBuild = false;
    for (let definition of this.activeSession.general.resourceDefinitions) {
      if (resourceType == definition.id) {
        this.activeSession.canBuild = true;
        break;
      }
    }
  }

  public onSelectedSearchResult(object: {}): void {
    this.selectedSearchItem = object;
    console.log(this.selectedSearchItem);
  }

  public pullResourceCreateForm() {
    console.log("====== begin pulling data test ======");
    this.questions = this.fhirService.createResource(this.activeSession.createResourceType);
    console.log(this.questions);
    this.resourceData = this.fhirService.getExistingResourceFromSearch(this.selectedSearchItem.fullURL);
    this.activeSession.built = true;
  }

  public searchForResource() {
    // Destroy the old search result
    this.activeSession.searchResult.length = 0;
    this.fhirService.search(this.activeSession.connectedServer,
      this.activeSession.selectedResourceType,
      this.activeSession.selectedSearchField,
      this.activeSession.searchValue)
      .subscribe(
      any => {
        // When we get back a an object
        this.updateSearchResults(any);
        console.log(this.activeSession.searchResult);
        this.activeSession.log.info(`Successfully searched the server.`)
      },
      error => {
        // When we hit a error
        this.activeSession.log.error("Search failed.")
      }
      );
  }

  private updateSearchResults(any: any) {
    //if(typeof any. === "undefined")
    // For each search result
    for (let entry of any.entry) {
      // An object to hold a search result
      let obj = {
        resource: entry.resource,
        name: entry.name
      };
      this.activeSession.searchResult.push(obj);
    }
  }

  /**
   * Creates a new session and returns it. Adds that session to the list of
   * sessions and sets its title to untitled.
   * @return {Session} The new session created.
   */
  newSession(): Session {
    let s = new Session();
    s.name = 'untitled';
    this.sessions.push(s);
    return s;
  }

  /**
   * Opens a given resource in a new session variable and sets the active
   * session to this new session. Return the new session once done.
   * @param {SavedResource} resource - The resource to open.
   * @return The newly created session for the saved resource given.
   */
  openSession(resource: SavedResource): Session {
    let s = new Session();
    s.name = resource.name;
    //s.selectedResourceType = resource.type;
    s.connectedServer = resource.server;
    this.sessions.push(s);
    // TODO: the sessions resource object should be obtained from the
    // SavedResource's id number
    return s;
  }

  /**
   * Deletes a given session from the list of all active sessions.
   */
  deleteSession(s: Session): number {
    // Get the index of the session
    let index = this.sessions.indexOf(s, 0);
    // If session exists, remove it
    if (index > -1) {
      let removed = this.sessions.splice(index, 1);
      // Check if it was the last session
      if (this.sessions.length == 0) {
        // There always needed to be a session
        this.sessions.push(new Session);
        this.sessions[0].name = 'untitled';
        this.activeSession = this.sessions[0];
      } else if (removed[0] == this.activeSession) {
        // The current session was removed, replace it with the first
        this.activeSession = this.sessions[0];
      }
      // End, the session has been deleted
      return 0;
    }
    // Session didn't exist, error
    return 1;
  }

  /**
   * Searches the sessions for a given session based on its unique id. If it
   * exists then it is returned, else null is.
   * @param {number} id - The unique id number of a session.
   * @return The session with the matching id or null.
   */
  getSession(id: number): Session {
    for (let i = 0; i < this.sessions.length; i++) {
      if (this.sessions[i].id == id) {
        // Found session, return it
        return this.sessions[i];
      }
    }
    // Session didn't exist, return null
    return null;
  }

  /**
   * Searchs for a requested endpoint. If it exists, it is returned. If it
   * doesn't exist then null is returned.
   * @param {string} name - The name of the endpoint requested.
   * @return {FhirEndpoint} The requested endpoint of null.
   */
  getEndpoint(name: string): FhirEndpoint {
    for (let i = 0; i < this.availableEndpoints.length; i++) {
      if (this.availableEndpoints[i].name == name) {
        // Found the endpoint
        return this.availableEndpoints[i];
      }
    }
    // Endpoint doesn't exist, error
    return null;
  }

  /**
   * Adds a server to the list of available servers. If a endpoint with the
   * same name or url exists the method fails to add the endpoint, otherwise
   * a '0' is returned. A return of '2' indicates the url exists, '1' thats the
   * name exists. Sorts the array when a new value is added.
   * @param {string} name - The name of the FHIR endpoint.
   * @param {string} url - The url of the FHIR endpoint.
   * @return {number} 0 for success or any other for failure.
   */
  addEndpoint(name: string, url: string): number {
    for (let i = 0; i < this.availableEndpoints.length; i++) {
      if (this.availableEndpoints[i].name == name) {
        // The 'name' already exists, report this
        return 1;
      }
      else if (this.availableEndpoints[i].url == url) {
        // The 'url' already exists, report this
        return 2;
      }
    }
    // The 'name' or 'url' doesn't exist
    this.availableEndpoints.push(new FhirEndpoint(name, url));
    this.availableEndpoints.sort();
    return 0;
  }

  /**
   * Removes a server from the list of available servers. If endpoint name does
   * not exist then '1' is returned. Otherwise it is removed and '0' is
   * returned.
   * @param {string} name - THe name of the FHIR endpoint to remove.
   * @return {number} 0 for success or any other for failure.
   */
  removeEndpoint(name: string): number {
    for (let i = 0; i < this.availableEndpoints.length; i++) {
      if (this.availableEndpoints[i].name == name) {
        // The 'name' exists, remove it and return
        this.availableEndpoints.splice(i, 1);
        return 0;
      }
    }
    // The endpoint name must not exist, shouldn't happen
    return 1;
  }
}
