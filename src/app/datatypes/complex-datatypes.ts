/**********************************************************
 All complex datatypes defined in the FHIR standard can be
 found in this file. Each types comments come directly
 from 'https://www.hl7.org/fhir/datatypes.html'.

 Author: David Lawson
 Title: Complex Datatypes
 Created: 16/04/2017
 Last Updated: 07/06/2017
 **********************************************************/
import {
  FhirBoolean, FhirInteger, FhirString, FhirDecimal, FhirUri,
  FhirBase64Binary, FhirInstant, FhirDate, FhirDateTime, FhirTime, FhirCode,
  FhirOid, FhirId, FhirMarkdown, FhirUnsignedInt, FhirPositiveInt
} from './primitive-datatypes'; // ALL primitive datatypes
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#Attachment'.
 */
export class Attachment {
  // from Element: extension
  contentType: FhirCode; // Mime type of the content, with charset etc
  language: FhirCode; // Human language of the content (BCP-47)
  data: FhirBase64Binary; // Data inline, base64ed
  url: FhirUri;  // Uri where the data can be found
  size: FhirUnsignedInt; // Number of bytes of content (if url provided)
  hash: FhirBase64Binary; // Hash of the data (sha-1, base64ed)
  title: FhirString; // Label to display in place of the data
  creation: FhirDateTime; // Date attachment was first created
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#Coding'.
 */
export class Coding {
  // from Element: extension
  system: FhirUri; // Identity of the terminology system
  version: FhirString; // Version of the system - if relevant
  code: FhirCode; // Symbol in syntax defined by the system
  display: FhirString; // Representation defined by the system
  userSelected: FhirBoolean; // If this coding was chosen directly by the user
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#CodeableConcept'.
 */
export class CodeableConcept {
  // from Element: extension
  coding: Coding[]; // Code defined by a terminology system
  test: FhirString; // Plain text representation of the concept
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#Quantity'.
 */
export class Quantity {
  // from Element: extension
  value: FhirDecimal; // Numerical value (with implicit precision)
  comparator: FhirCode; // < | <= | >= | > - how to understand the value
  unit: FhirString; // Unit representation
  system: FhirUri; // C? System that defines coded unit form
  code: FhirCode; // Coded form of the unit
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#Range'.
 */
export class Range {
  // from Element: extension
  low: Quantity; // C? Low limit
  high: Quantity; // C? High limit
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#Ratio'.
 */
export class Ratio {
  // from Element: extension
  numerator: Quantity; // Numerator value
  denominator: Quantity; // Denominator value
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#Period'.
 */
export class Period {
  // from Element: extension
  start: FhirDateTime; // C? Starting time with inclusive boundary
  end: FhirDateTime; // C? End time with inclusive boundary, if not ongoing
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#SampledData'.
 */
export class SampledData {
  // from Element: extension
  origin: Quantity; // R!  Zero value and units
  period: FhirDecimal; // R!  Number of milliseconds between samples
  factor: FhirDecimal; // Multiply data by this before adding to origin
  lowerLimit: FhirDecimal; // Lower limit of detection
  upperLimit: FhirDecimal; // Upper limit of detection
  dimensions: FhirPositiveInt; // R!  Number of sample points at each time point
  data: FhirString; // R!  Decimal values with spaces, or "E" | "U" | "L"
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#Identifier'.
 */
export class Identifier {
  // from Element: extension
  use: FhirCode; // usual | official | temp | secondary (If known)
  type: CodeableConcept; // Description of identifier
  system: FhirUri; // The namespace for the identifier value
  value: FhirString; // The value that is unique
  period: Period; // Time period when id is/was valid for use
  assigner: Reference; // Organization that issued id (may be just text)
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#HumanName'.
 */
export class HumanName {
  resourceType: string;
  // from Element: extension
  use: FhirCode; // usual | official | temp | nickname | anonymous | old | maiden
  text: FhirString; // Text representation of the full name
  family: FhirString; // Family name (often called 'Surname')
  given: FhirString[]; // Given names (not always 'first'). Includes middle names
  prefix: FhirString[]; // Parts that come before the name
  suffix: FhirString[]; // Parts that come after the name
  period: Period; // Time period when name was/is in use

  constructor() {
    this.resourceType = "HumanName";
  }
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#Address'.
 */
export class Address {
  resourceType: string;
  // from Element: extension
  use: FhirCode; // home | work | temp | old - purpose of this address
  type: FhirCode; // postal | physical | both
  text: FhirString; // Text representation of the address
  line: FhirString[]; // Street name, number, direction & P.O. Box etc.
  city: FhirString; // Name of city, town etc.
  district: FhirString; // District name (aka county)
  state: FhirString; // Sub-unit of country (abbreviations ok)
  postalCode: FhirString; // Postal code for area
  country: FhirString; // Country (e.g. can be ISO 3166 2 or 3 letter code)
  period: Period; // Time period when address was/is in use

  constructor() {
    this.resourceType = "Address";
    this.use = new FhirCode({
      key: 'code',
      label: 'use',
      order: 11
    });
    this.type = new FhirCode({
      key: 'code',
      label: 'type',
      order: 11
    });
    this.text = new FhirString({
      key: 'string',
      label: 'text',
      order: 11
    });
    this.line = [];
    this.city = new FhirString({
      key: 'string',
      label: 'city',
      order: 11
    });
    this.district = new FhirString({
      key: 'string',
      label: 'district',
      order: 11
    });
    this.postalCode = new FhirString({
      key: 'string',
      label: 'postalCode',
      order: 11
    });
    this.country = new FhirString({
      key: 'string',
      label: 'country',
      order: 11
    });
    this.period = new Period();
  }
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#ContactPoint'.
 */
export class ContactPoint {
  resourceType: string;
  // from Element: extension
  system: FhirCode; // C? phone | fax | email | pager | url | sms | other
  value: FhirString; // The actual contact point details
  use: FhirCode; // home | work | temp | old | mobile - purpose of this contact point
  rank: FhirPositiveInt; // Specify preferred order of use (1 = highest)
  period: Period; // Time period when the contact point was/is in use

  constructor() {
    this.resourceType = "ContactPoint";
  }
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#Timing'.
 */
export class Timing {
  resourceType: string;
  // from Element: extension
  event: FhirDateTime[]; // When the event occurs
  repeat: { // When the event is to occur
    // bounds[x]: Length/Range of lengths, or (Start and/or end) limits. One of these 3:
    boundsDuration : Quantity,
    boundsRange : Range,
    boundsPeriod : Period,
    count: FhirInteger;
    countMax: FhirInteger;
    duration: FhirDecimal;
    durationMax: FhirDecimal;
    durationUnit: FhirCode;
    frequency: FhirInteger;
    frequencyMax: FhirInteger;
    period: FhirDecimal;
    periodMax: FhirDecimal;
    periodUnit: FhirCode;
    dayOfWeek: FhirCode[];
    timeOfDay: FhirTime[];
    when: FhirCode[];
    offset: FhirUnsignedInt;
  };
  code: CodeableConcept;

  constructor() {
    this.resourceType = "Timing";
  }
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#Signature'.
 */
export class Signature {
  // from Element: extension
  type: Coding[];
  when: FhirInstant;
  // who[x]: Who signed. One of these 2:
  whoUri: FhirUri;
  whoReference: Reference;
  // onBehalfOf[x]: The party represented. One of these 2:
  onBehalfOfUri: FhirUri;
  onBehalfOfReference: Reference;
  contentType: FhirCode;
  blob: FhirBase64Binary;
}
/**
 * See: 'https://www.hl7.org/fhir/datatypes.html#Annotation'.
 */
export class Annotation {
  // from Element: extension
  // author[x]: Individual responsible for the annotation. One of these 2:
  authorReference: Reference;
  authorString: FhirString;
  time: FhirDateTime;
  text: FhirString;
}

/**
 * Other
 * See: 'https://www.hl7.org/fhir/resource.html#Meta'.
 */
export class Meta {
  versionId: FhirId; // Version specific identifier
  lastUpdated: FhirInstant; // When the resource version last changed
  profile: FhirUri[]; // Profiles this resource claims to conform to
  security: Coding[]; // Security Labels applied to this resource
  tag: Coding[]; // Tags applied to this resource
}
export class Reference {
  reference: FhirString; // C? Literal reference, Relative, internal or absolute URL
  identifier: Identifier; // Logical reference, when literal reference is not known
  display: FhirString; // Text alternative for the resource
}
export class Link {
  target: Reference; // R!  The resource to which this actual person is associated
  assurance: string; // level1 | level2 | level3 | level4
}
export class Text {
  status: FhirString; // UNKNOWN
  div: FhirString; // UNKNOWN - potentially raw html
}
