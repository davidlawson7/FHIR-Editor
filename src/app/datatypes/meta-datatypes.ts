import { ContactPoint, CodeableConcept, Quantity, Range } from '../datatypes/complex-datatypes';

export class ContactDetail {
  resourceType: string;
  name: string;
  telecom: ContactPoint[];
}

export class UsageContext {
  resourceType: string;
  code: string[];
  valueCodeableConcept: CodeableConcept[];
  valueQuantity: Quantity[];
  valueRange: Range[];
}
