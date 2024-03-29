import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { FhirPrimitiveType } from './primitive-datatypes';
import {
  FhirBoolean, FhirInteger, FhirString, FhirDecimal, FhirUri,
  FhirBase64Binary, FhirInstant, FhirDate, FhirDateTime, FhirTime, FhirCode,
  FhirOid, FhirId, FhirMarkdown, FhirUnsignedInt, FhirPositiveInt
} from './primitive-datatypes';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class FhirService {

  private testUrl = 'api';                                  // URL to test api
  private fhirUrl: string;     // URL to fhir api
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

  public updateService(endpoint: string) {
    console.log("====== updating new endpoint via new function =======");
    console.log(endpoint);
    this.fhirUrl = endpoint;
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
              },
              error => {
                console.log(`no structuredef for ${resource.type}`);
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


  public getCapabilityStatement(endpoint: string): Observable<any> {
    const url = `${endpoint}/metadata`;
    return this.http.get(url, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getStructureDefinition(resourceType: string, endpoint: string): Observable<any> {
    // The URL that will be used to ping the StructureDefinition
    const url = `${endpoint}/StructureDefinition/${resourceType}`;
    console.log(url);
    return this.http.get(url, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public createResource(type: string): any[] {
    let questions: any[] = [];
    for (let resource of this.resourceTypes) {
      if (resource.id == type) {
        // Found the resource we are building
        for (let element of resource.snapshot.element) {
          if (!element.hasOwnProperty('type')) {
            questions.push(element.id);
            return questions;
          } // Skip any field with no type i.e. the First
        }
      }
    }
    return null;
  }

  public search(endpoint: string, type: string, searchby: string, value: string): Observable<any> {
    // Construct the search URL
    const url = `${endpoint}/${type}?${searchby}:contains=${value}`;
    // Perform the search
    return this.http.get(url, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getExistingResourceFromSearch(fullUrl: string): Observable<any> {
    return this.http.get(fullUrl, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getResourceFields(type: string): string[] {
    let fields: string[] = [];
    for (let resource of this.resourceTypes) {
      if (resource.id == type) {
        // Found the resource we are building
        console.log(resource);
        for (let element of resource.snapshot.element) {
          if (!element.hasOwnProperty('type')) {
            continue;
          } // Skip any field with no type i.e. the First
          // Get the current field name & its coded value
          let names = element.id.split(".", 4);
          if (names.length == 2) {
            if (names[1] == 'contained'
              || names[1] == 'managingOrganization'
              || names[1] == 'modifierExtension'
              || names[1] == 'extension'
              || names[1] == 'generalPractitioner') { continue }
            let fieldName = names[1]; // i.e. the 'id' in 'Patient.id'
            fields.push(fieldName);
          }

        }
        break;
      }
    }
    return fields;
  }

  public createResourceField(type: string, field: string, currentFields: string[]): any[] {
    console.log("Creating a new field");
    let questions: any[] = [];
    for (let resource of this.resourceTypes) {
      if (resource.id == type) {
        console.log("found the resource");
        // Found the resource we are building
        for (let element of resource.snapshot.element) {
          if (element.hasOwnProperty('type')) {

            let fieldName = element.id.split(".", 2)[1]; // i.e. the 'id' in 'Patient.id'
            let code = element.type[0].code;
            console.log(`Fieldname deduced: ${fieldName}, fieldname given: ${field}`);
            if (fieldName == field) {
              // Found the field we are looking for
              console.log("found the field inside the resource we are looking for");
              if (element.max == "1") {
                console.log("ADDING FIELD");
                console.log(field);
                currentFields.push(field);
              }

              // Determine how best to process the field
              if (this.primitiveTypeNames.indexOf(code) != -1) {
                // Field holds a primitive type
                console.log("IS PRIMITIVE");
                this.transformPrimitiveType(questions, fieldName, code, element);
              } else if (this.complexTypeNames.indexOf(code) != -1) {
                // Field holds a complex type
                console.log("IS COMPLEX");
                this.buildComplexTypeObject(code, questions, fieldName);
              }
              console.log("Inside the service");
              console.log(questions);
              return questions;
            }

          }
        }
      }
    }
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

  private buildComplexTypeObject(type: string, object: any[], fname: string) {
    console.log(`Starting to build primitive, ${fname}`);
    let questions: any[] = [];

    for (let complex of this.complexTypes) {
      if (complex.id == type) {
        // Found the complex type we are building
        for (let element of complex.snapshot.element) {
          if (!element.hasOwnProperty('type')) {
            questions.push(element.id);

            questions.push(`${fname}`);
            continue;
          } // Skip any field with no type i.e. the First

          // Get the current field name & its coded value
          let fieldName = element.id.split(".", 2)[1]; // i.e. the 'id' in 'Patient.id'
          let code = element.type[0].code;

          // Determine how best to process the field
          if (this.primitiveTypeNames.indexOf(code) != -1) {
            // Field holds a primitive type
            this.transformPrimitiveType(questions, fieldName, code, element);
          } else if (this.complexTypeNames.indexOf(code) != -1) {
            // Field holds a complex type
            this.buildComplexTypeObject(code, questions, fieldName);
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

  private transformPrimitiveType(formGroup: any[], fieldName: string, code: string, element: any) {
    //primitiveObject[fieldName] = {};
    console.log(`Starting to build primitive, ${fieldName}, code: ${code}`);
    switch (code) {
      // Primitive Types
      case "boolean": {
        //console.log("Primitive Type: boolean");
        let primitiveObject: FhirPrimitiveType<any> = new FhirBoolean({
          key: `_${fieldName}`,
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
          key: `_${fieldName}`,
          label: fieldName,
          order: 2
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "string": {
        //console.log("Primitive Type: string");
        let primitiveObject: FhirPrimitiveType<any> = new FhirString({
          key: `_${fieldName}`,
          label: fieldName,
          order: 3
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "decimal": {
        //console.log("Primitive Type: decimal");
        let primitiveObject: FhirPrimitiveType<any> = new FhirDecimal({
          key: `_${fieldName}`,
          label: fieldName,
          order: 4
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "uri": {
        //console.log("Primitive Type: uri");
        let primitiveObject: FhirPrimitiveType<any> = new FhirUri({
          key: `_${fieldName}`,
          label: fieldName,
          order: 5
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "base64Binary": {
        //console.log("Primitive Type: base64Binary");
        let primitiveObject: FhirPrimitiveType<any> = new FhirBase64Binary({
          key: `_${fieldName}`,
          label: fieldName,
          order: 6
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "instant": {
        //console.log("Primitive Type: instant");
        let primitiveObject: FhirPrimitiveType<any> = new FhirInstant({
          key: `_${fieldName}`,
          label: fieldName,
          order: 7
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "date": {
        //console.log("Primitive Type: date");
        let primitiveObject: FhirPrimitiveType<any> = new FhirDate({
          key: `_${fieldName}`,
          label: fieldName,
          order: 8
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "dateTime": {
        //console.log("Primitive Type: dateTime");
        let primitiveObject: FhirPrimitiveType<any> = new FhirDateTime({
          key: `_${fieldName}`,
          label: fieldName,
          order: 9
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "time": {
        //console.log("Primitive Type: time");
        let primitiveObject: FhirPrimitiveType<any> = new FhirTime({
          key: `_${fieldName}`,
          label: fieldName,
          order: 10
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "code": {
        //console.log("Primitive Type: code");
        let theOptions = [];
        // Get all options
        if (element.hasOwnProperty('binding')
          && element.binding.hasOwnProperty('valueSetReference')
          && element.binding.valueSetReference.hasOwnProperty('reference')) {
          this.getValueSet(this.fhirUrl, element)
            .subscribe(
            valueSet => {
              /* Grab and store the new capability statement */
              this.getCodeSystem(valueSet)
                .subscribe(
                codeSystem => {
                  for (let thecode of codeSystem.concept) {
                    theOptions.push({ key: thecode.display, value: thecode.code });
                  }

                })
            });
        }

        let primitiveObject: FhirPrimitiveType<any> = new FhirCode({
          key: `_${fieldName}`,
          label: fieldName,
          options: theOptions,
          order: 11
        });

        formGroup.push(primitiveObject);
        break;
      }
      case "oid": {
        //console.log("Primitive Type: oid");
        let primitiveObject: FhirPrimitiveType<any> = new FhirOid({
          key: `_${fieldName}`,
          label: fieldName,
          order: 12
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "id": {
        //console.log("Primitive Type: id");
        let primitiveObject: FhirPrimitiveType<any> = new FhirId({
          key: `_${fieldName}`,
          label: fieldName,
          order: 13
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "markdown": {
        //console.log("Primitive Type: markdown");
        let primitiveObject: FhirPrimitiveType<any> = new FhirMarkdown({
          key: `_${fieldName}`,
          label: fieldName,
          order: 14
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "unsignedInt": {
        //console.log("Primitive Type: unsignedInt");
        let primitiveObject: FhirPrimitiveType<any> = new FhirUnsignedInt({
          key: `_${fieldName}`,
          label: fieldName,
          order: 15
        });
        formGroup.push(primitiveObject);
        break;
      }
      case "positiveInt": {
        //console.log("Primitive Type: positiveInt");
        let primitiveObject: FhirPrimitiveType<any> = new FhirPositiveInt({
          key: `_${fieldName}`,
          label: fieldName,
          order: 16
        });
        formGroup.push(primitiveObject);
        break;
      }
    }
  }

  private getValueSet(endpoint: string, system: any) {
    // The URL that will be used to ping the StructureDefinition
    console.log(system);
    const url = `${system.binding.valueSetReference.reference}`;
    console.log(url);
    return this.http.get(url, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private getCodeSystem(system: any) {
    // The URL that will be used to ping the StructureDefinition
    const url = `${system.compose.include[0].system}`;
    return this.http.get(url, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }
}
