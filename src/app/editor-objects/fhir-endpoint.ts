/**
 * Represents a FHIR endpoint (a server basically). Holds the servers name and
 * url.
 */
export class FhirEndpoint {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    this.name = name;
    this.url = url;
  }
}
