import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Person } from './person';
import { Patient } from './patient';

@Injectable()
export class FhirService {

  private testUrl = 'api';                                  // URL to test api
  private fhirUrl = 'http://fhirtest.uhn.ca/baseDstu3';     // URL to fhir api
  private headers = new Headers({"Accept": "application/fhir+json"});

  constructor(private http: Http) { }

  getResources(type: string): Promise<any> {
    if(type === "Patient") {
      return this.getPatients();
    } else if(type === "Person") {
      return this.getPeople();
    } else {
      return null;
    }
  }
  /* Get a general resource option */
  getResource(id: string, type: string, server: string): Promise<any> {
    if(type === "Patient") {
      return this.getPatient(id);
    } else if(type === "Person") {
      let p = this.getPerson(id, server);
      console.log(p);
      return p;
    } else {
      return null;
    }
  }

  /* Get a list of patients resources */
  getPatients(): Promise<Patient[]> {
    const url = `${this.testUrl}/Patient`;
    return this.http.get(url)
              .toPromise()
              .then(response => response.json().data as Patient[])
              .catch(this.handleError);
  }

  /* Get a single patient based on their id */
  getPatient(id: string): Promise<Patient> {
    const url = `${this.testUrl}/Patient/${id}`;
    console.log(`getPatient URL: ${url}`);
    return this.http.get(url)
              .toPromise()
              .then(response => response.json().data as Patient)
              .catch(this.handleError);
  }

  /* Get a list of people resources */
  getPeople(): Promise<Person[]> {
    const url = `${this.fhirUrl}/Person`;
    return this.http.get(url, {headers: this.headers})
              .toPromise()
              .then(response => response.json() as Person[])
              .catch(this.handleError);
  }
  /* Get a single person based on their id */
  getPerson(id: string, server: string): Promise<Person> {
    console.log(server);
    const url = `${server}/Person/${id}`;
    return this.http.get(url, {headers: this.headers})
              .toPromise()
              .then(response => response.json() as Person)
              .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
