import { Meta, Coding, Identifier, HumanName, ContactPoint, Address, Attachment, Reference, Link, Text } from './datatypes/common-datatypes';
export class Person {
  resourceType: string;
  id: string; // Logical id of this artifact
  meta: Meta; // Metadata about the resource
  implicitRules: string; // A set of rules under which this content was created
  language: string; // Language of the resource content
  text: Text;
  identifier: Identifier[]; // A human identifier for this person
  name: HumanName[]; // A name associated with the person
  telecom: ContactPoint[]; // A contact detail for the person
  gender: string; // male | female | other | unknown
  birthDate: Date; // The date on which the person was born
  address: Address[]; // One or more addresses for the person
  photo: Attachment; // Image of the person
  managingOrganization: Reference; // The organization that is the custodian of the person record
  active: boolean; // This person's record is in active use
  link: Link[]; // Link to a resource that concerns the same actual person
}
