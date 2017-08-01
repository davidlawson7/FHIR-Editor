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

@Injectable()
export class FhirService {

  private testUrl = 'api';                                  // URL to test api
  private fhirUrl = 'http://fhirtest.uhn.ca/baseDstu3';     // URL to fhir api
  private headers = new Headers({"Accept": "application/fhir+json"});

  constructor(private http: Http) { }

  public search(endpoint: string, type: string, searchby: string, value: string): Observable<any> {
    // Construct the search URL
    const url = `${endpoint}/${type}?${searchby}:contains=${value}`;
    // Perform the search
    return this.http.get(url, {headers: this.headers})
              .map(this.extractData)
              .catch(this.handleError);
  }

  public getCapabilityStatement(endpoint: string): Observable<any> {
    const url = `${endpoint}/metadata`;
    return this.http.get(url, {headers: this.headers})
              .map(this.extractData)
              .catch(this.handleError);
  }

  public getStructureDefinition(resourceType: string, endpoint: string): Observable<any> {
    // The URL that will be used to ping the StructureDefinition
    const url = `${endpoint}/StructureDefinition/${resourceType}`;
    return this.http.get(url, {headers: this.headers})
              .map(this.extractData)
              .catch(this.handleError);
  }

  public toFormGroup(questions: FhirPrimitiveType<any>[] ) {
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
    return body || { };
  }
  /**
   * Handles the API error.
   */
  private handleError (error: Response | any) {
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

}
