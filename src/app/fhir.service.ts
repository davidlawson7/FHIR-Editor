import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';


@Injectable()
export class FhirService {

  private testUrl = 'api';                                  // URL to test api
  private fhirUrl = 'http://fhirtest.uhn.ca/baseDstu3';     // URL to fhir api
  private headers = new Headers({"Accept": "application/fhir+json"});

  constructor(private http: Http) { }

  getCapabilityStatement(endpoint: string): Observable<any> {
    const url = `${endpoint}/metadata`;
    return this.http.get(url, {headers: this.headers})
              .map(this.extractData)
              .catch(this.handleError);
  }

  getStructureDefinition(resourceType: string, endpoint: string): Observable<any> {
    // The URL that will be used to ping the StructureDefinition
    const url = `${endpoint}/StructureDefinition/${resourceType}`;
    return this.http.get(url, {headers: this.headers})
              .map(this.extractData)
              .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

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
