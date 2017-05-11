export class Meta {
  versionId: string; // Version specific identifier
  lastUpdated: Date; // When the resource version last changed
  profile: string; // Profiles this resource claims to conform to
  security: Coding[]; // Security Labels applied to this resource
  tag: Coding[]; // Tags applied to this resource
}

export class Coding {
  system: string; // Identity of the terminology system
  version: string; // Version of the system - if relevant
  code: string; // Symbol in syntax defined by the system
  display: string; // Representation defined by the system
  userSelected: boolean; // If this coding was chosen directly by the user
}

export class Identifier {
  use: string; // usual | official | temp | secondary (If known)
  type: CodeableConcept; // Description of identifier
  system: string; // The namespace for the identifier value
  value: string; // The value that is unique
  period: Period; // Time period when id is/was valid for use
  assigner: Reference; // Organization that issued id (may be just text)
}

export class CodeableConcept {
  coding: Coding[]; // Code defined by a terminology system
  test: string; // Plain text representation of the concept
}

export class Period {
  start: Date; // C? Starting time with inclusive boundary
  end: Date; // C? End time with inclusive boundary, if not ongoing
}

export class Reference {
  reference: string; // C? Literal reference, Relative, internal or absolute URL
  identifier: Identifier; // Logical reference, when literal reference is not known
  display: string; // Text alternative for the resource
}

export class HumanName {
  resourceType: string;
  use: string; // usual | official | temp | nickname | anonymous | old | maiden
  text: string; // Text representation of the full name
  family: string; // Family name (often called 'Surname')
  given: string[]; // Given names (not always 'first'). Includes middle names
  prefix: string[]; // Parts that come before the name
  suffix: string[]; // Parts that come after the name
  period: Period; // Time period when name was/is in use
}

export class ContactPoint {
  resourceType: string;
  system: string; // C? phone | fax | email | pager | url | sms | other
  value: string; // The actual contact point details
  use: string; // home | work | temp | old | mobile - purpose of this contact point
  rank: number; // Specify preferred order of use (1 = highest)
  period: Period; // Time period when the contact point was/is in use
}

export class Address {
  resourceType: string;
  use: string; // home | work | temp | old - purpose of this address
  type: string; // postal | physical | both
  text: string; // Text representation of the address
  line: string[]; // Street name, number, direction & P.O. Box etc.
  city: string; // Name of city, town etc.
  district: string; // District name (aka county)
  state: string; // Sub-unit of country (abbreviations ok)
  postalCode: string; // Postal code for area
  country: string; // Country (e.g. can be ISO 3166 2 or 3 letter code)
  period: Period; // Time period when address was/is in use
}

export class Attachment {
  contentType: string; // Mime type of the content, with charset etc
  language: string; // Human language of the content (BCP-47)
  data: string; // Data inline, base64ed
  url: string;  // Uri where the data can be found
  size: number; // Number of bytes of content (if url provided)
  hash: string; // Hash of the data (sha-1, base64ed)
  title: string; // Label to display in place of the data
  creation: Date; // Date attachment was first created
}

export class Link {
  target: Reference; // R!  The resource to which this actual person is associated
  assurance: string; // level1 | level2 | level3 | level4
}

export class Text {
    status: string; // UNKNOWN
    div: string; // UNKNOWN - potentially raw html
}
