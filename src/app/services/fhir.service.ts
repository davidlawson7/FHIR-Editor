/**********************************************************
 This file handles communication with FHIR endpoints. A
 series of methods are declared here which handle a range
 of things from searchs and other varied queries to more
 specific requests such as Conformance requests.

 Author: David Lawson
 Title: FHIR Data Service
 Created: 16/04/2017
 Last Updated: 07/06/2017
 **********************************************************/

import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FhirPrimitiveType } from '../datatypes/primitive-datatypes'
import {
  FhirBoolean, FhirInteger, FhirString, FhirDecimal, FhirUri,
  FhirBase64Binary, FhirInstant, FhirDate, FhirDateTime, FhirTime, FhirCode,
  FhirOid, FhirId, FhirMarkdown, FhirUnsignedInt, FhirPositiveInt
} from '../datatypes/primitive-datatypes'; // ALL primitive datatypes

@Injectable()
export class FhirService {

  private testUrl = 'api';                                  // URL to test api
  private fhirUrl = 'http://fhirtest.uhn.ca/baseDstu3';     // URL to fhir api
  private headers = new Headers({ "Accept": "application/fhir+json" });
  private primitiveTypeNames: string[] = [  // Known primitive types
    'boolean', 'integer', 'string', 'decimal', 'uri', 'base64Binary', 'instant',
    'date', 'dateTime', 'time', 'code', 'oid', 'id', 'markdown', 'unsignedInt',
    'positiveInt'
  ];
  private complexTypeNames: string[] = [    // Known complex types
    'Attachment', 'Coding', 'CodeableConcept', 'Quantity', 'Range', 'Ratio',
    'Period', 'SampledData', 'Identifier', 'HumanName', 'Address',
    'ContactPoint', 'Timing', 'Signature', 'Annotation', 'Meta', 'Narrative',
    'BackboneElement'
  ];
  private complexTypes: any[];
  private resourceTypes: any[];
  private capabilityStatement: any;

  constructor(private http: Http) {
    this.complexTypes = [];
    this.resourceTypes = [];
  }

  /**
   * Updates service information based on a new endpoint. Updates
   * capabilityStatement, complexTypes structureDefinition's, and
   * resources structureDefinition's.
   */
  public updateService(endpoint: string) {
    console.log("====== updating new endpoint via new function =======");
    this.getCapabilityStatement(endpoint)
      .subscribe(
      capabilityStatement => {
        /* Grab and store the new capability statement */
        this.capabilityStatement = capabilityStatement;

        /* Grab all possible resource types */
        this.resourceTypes.length = 0; // Empty old array
        for (let rest of this.capabilityStatement.rest) {
          for (let resource of rest.resource) {
            // Found a resource, grabs its definition
            this.getStructureDefinition(resource.type, endpoint)
              .subscribe(
              resourceDefinition => {
                this.resourceTypes.push(resourceDefinition);
              }
              );
          }
        }

        /* Grab all possible complex datatypes */
        this.complexTypes.length = 0; // Empty old array
        for (let datatype of this.complexTypeNames) {
          // Got a complex datatype name, get its definition
          this.getStructureDefinition(datatype, endpoint)
            .subscribe(
            complexTypeDefinition => {
              this.complexTypes.push(complexTypeDefinition);
            }
            );
        }
      },
      error => { }
      );
  }

  /**
   * Grabs the resources structure definition. Then iterates through, building
   * each type and complex type recursively (structure for complex types
   * already known), and returns a FormGroup containing FormControls and other
   * ForGroups.
   */

  public createResource(type: string): any[] {

    let questions: any[] = [];

    for (let resource of this.resourceTypes) {
      if (resource.id == type) {
        // Found the resource we are building
        for (let element of resource.snapshot.element) {
          if (!element.hasOwnProperty('type')) {
            questions.push(element.id);
            continue;
          } // Skip any field with no type i.e. the First

          // Get the current field name & its coded value
          let fieldName = element.id.split(".", 2)[1]; // i.e. the 'id' in 'Patient.id'
          let code = element.type[0].code;

          // Determine how best to process the field
          if (this.primitiveTypeNames.indexOf(code) != -1) {
            // Field holds a primitive type
            this.transformPrimitiveType(questions, fieldName, code);
          } else if (this.complexTypeNames.indexOf(code) != -1) {
            // Field holds a complex type
            this.buildComplexTypeObject(code, questions);
          } else {
            //console.log(`Unknown field type in base resource ${type}: ${fieldName}:${code}`);
          }
        }
        break;
      }
    }
    return questions;
  }


  /****************************************************************************
   *                             Helper Functions
   ****************************************************************************/
  private buildComplexTypeObject(type: string, object: any[]) {

    let questions: any[] = [];

    for (let complex of this.complexTypes) {
      if (complex.id == type) {
        // Found the complex type we are building
        for (let element of complex.snapshot.element) {
          if (!element.hasOwnProperty('type')) {
            questions.push(element.id);
            continue;
          } // Skip any field with no type i.e. the First

          // Get the current field name & its coded value
          let fieldName = element.id.split(".", 2)[1]; // i.e. the 'id' in 'Patient.id'
          let code = element.type[0].code;

          // Determine how best to process the field
          if (this.primitiveTypeNames.indexOf(code) != -1) {
            // Field holds a primitive type
            this.transformPrimitiveType(questions, fieldName, code);
          } else if (this.complexTypeNames.indexOf(code) != -1) {
            // Field holds a complex type
            this.buildComplexTypeObject(code, questions);
          } else {
            //console.log(`Unknown field type in complex datatype ${type}: ${fieldName}:${code}`);
          }
        }
        break;
      }
    }
    // Add the complex type to the list of questions
    object.push(questions);
  }




  public search(endpoint: string, type: string, searchby: string, value: string): Observable<any> {
    // Construct the search URL
    const url = `${endpoint}/${type}?${searchby}:contains=${value}`;
    // Perform the search
    return this.http.get(url, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCapabilityStatement(endpoint: string): Observable<any> {
    const url = `${endpoint}/metadata`;
    return this.http.get(url, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getStructureDefinition(resourceType: string, endpoint: string): Observable<any> {
    // The URL that will be used to ping the StructureDefinition
    const url = `${endpoint}/StructureDefinition/${resourceType}`;
    return this.http.get(url, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public toFormGroup(questions: FhirPrimitiveType<any>[]) {
    let group: any = {};

    questions.forEach(question => {
      group[question.key] = question.required ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  /********************************************************
    Private methods be here..
   ********************************************************/

  /**
   * Pulls the data and puts it in a JSON object.
   */
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  /**
   * Handles the API error.
   */
  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  /**
   *
   */
  private transformPrimitiveType(formGroup: any[], fieldName: string, code: string) {
    //primitiveObject[fieldName] = {};
    switch (code) {
      // Primitive Types
      case "boolean": {
        //console.log("Primitive Type: boolean");
        let primitiveObject: FhirPrimitiveType<any> = new FhirBoolean({
          key: 'boolean',
          label: fieldName,
          options: [
            { key: 'True', value: true },
            { key: 'False', value: false }
          ],
          order: 1
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "integer": {
        //console.log("Primitive Type: integer");
        let primitiveObject: FhirPrimitiveType<any> = new FhirInteger({
          key: 'integer',
          label: fieldName,
          order: 2
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "string": {
        //console.log("Primitive Type: string");
        let primitiveObject: FhirPrimitiveType<any> = new FhirString({
          key: 'string',
          label: fieldName,
          order: 3
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "decimal": {
        //console.log("Primitive Type: decimal");
        let primitiveObject: FhirPrimitiveType<any> = new FhirDecimal({
          key: 'decimal',
          label: fieldName,
          order: 4
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "uri": {
        //console.log("Primitive Type: uri");
        let primitiveObject: FhirPrimitiveType<any> = new FhirUri({
          key: 'uri',
          label: fieldName,
          order: 5
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "base64Binary": {
        //console.log("Primitive Type: base64Binary");
        let primitiveObject: FhirPrimitiveType<any> = new FhirBase64Binary({
          key: 'base64Binary',
          label: fieldName,
          order: 6
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "instant": {
        //console.log("Primitive Type: instant");
        let primitiveObject: FhirPrimitiveType<any> = new FhirInstant({
          key: 'instant',
          label: fieldName,
          order: 7
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "date": {
        //console.log("Primitive Type: date");
        let primitiveObject: FhirPrimitiveType<any> = new FhirDate({
          key: 'date',
          label: fieldName,
          order: 8
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "dateTime": {
        //console.log("Primitive Type: dateTime");
        let primitiveObject: FhirPrimitiveType<any> = new FhirDateTime({
          key: 'dateTime',
          label: fieldName,
          order: 9
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "time": {
        //console.log("Primitive Type: time");
        let primitiveObject: FhirPrimitiveType<any> = new FhirTime({
          key: 'time',
          label: fieldName,
          order: 10
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "code": {
        //console.log("Primitive Type: code");
        let primitiveObject: FhirPrimitiveType<any> = new FhirCode({
          key: 'code',
          label: fieldName,
          order: 11
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "oid": {
        //console.log("Primitive Type: oid");
        let primitiveObject: FhirPrimitiveType<any> = new FhirOid({
          key: 'oid',
          label: fieldName,
          order: 12
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "id": {
        //console.log("Primitive Type: id");
        let primitiveObject: FhirPrimitiveType<any> = new FhirId({
          key: 'id',
          label: fieldName,
          order: 13
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "markdown": {
        //console.log("Primitive Type: markdown");
        let primitiveObject: FhirPrimitiveType<any> = new FhirMarkdown({
          key: 'markdown',
          label: fieldName,
          order: 14
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "unsignedInt": {
        //console.log("Primitive Type: unsignedInt");
        let primitiveObject: FhirPrimitiveType<any> = new FhirUnsignedInt({
          key: 'unsignedInt',
          label: fieldName,
          order: 15
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "positiveInt": {
        //console.log("Primitive Type: positiveInt");
        let primitiveObject: FhirPrimitiveType<any> = new FhirPositiveInt({
          key: 'positiveInt',
          label: fieldName,
          order: 16
        });
        formGroup.push(primitiveObject);
        break;
      }
    }
  }
}
