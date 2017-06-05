import { Meta, Identifier, CodeableConcept, Coding } from '../datatypes/complex-datatypes';
import { ContactDetail, UsageContext } from '../datatypes/meta-datatypes';
import { Extension } from '../datatypes/special-datatypes';
/**
 * This file is for common resources which structure is needed before pulling
 * it.
 */

/**
 * A StructureDefinition is a core Resource used to defined the structure of
 * other Resources. Required to build a other Resource objects.
 */
export class StructureDefinition {
  resourceType: string;
  id: string;
  meta: Meta;
  text: Text;
  url: string;
  identifier: Identifier[];
  version: string;
  name: string;
  title: string;
  extension: Extension[];
  status: string;
  experimental: boolean;
  date: string;
  publisher: string;
  contact: ContactDetail[];
  description: string;
  userContext: UsageContext[];
  jurisdiction: CodeableConcept[];
  purpose: string;
  copyright: string;
  keyword: Coding[];
  fhirVersion: string;
  mapping: [{
    identity: string,
    uri: string,
    name: string,
    comment: string
  }];
  kind: string;
  abstract: boolean;
  contextType: string;
  context: string[];
  contextInvariant: string[];
  type: string;
  baseDefinition: string;
  derivation: string;
  snapshot: {
    element: any[];               // TODO: temp representation as its big
  };
  defferential: {
    element: any[];               // TODO: temp representation as its big
  }
}

export class ElementDefinition {

}
