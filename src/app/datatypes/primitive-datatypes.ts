/**********************************************************
 This file pretty much outlines how each base type is
 handled when processed. Each types comments come directly
 from 'https://www.hl7.org/fhir/datatypes.html'.

 Author: David Lawson
 Title: Primitive Datatypes
 Created: 07/06/2017
 Last Updated: 07/06/2017
 **********************************************************/

/**
 * The base object for all types in expected from FHIR. All FHIR types extend
 * this one.
 */
export class FhirPrimitiveType<T> {
  value: T;
  key: string;
  label: string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    controlType?: string
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
  }
}
/**
 * true | false
 */
export class FhirBoolean extends FhirPrimitiveType<boolean> {
  controlType = 'boolean';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
/**
 * A signed 32-bit integer (for larger values, use decimal).
 */
export class FhirInteger extends FhirPrimitiveType<number> {
  controlType = 'input';
  type: number;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * A sequence of Unicode characters	xs:string	JSON String.
 *
 * Note that strings SHALL NOT exceed 1MB in size. String should not contain
 * Unicode character points below 32, except for u0009 (horizontal tab), u0010
 * (carriage return) and u0013 (line feed).
 */
export class FhirString extends FhirPrimitiveType<string> {
  controlType = 'input';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * Rational numbers that have a decimal representation. See below about the
 * precision of the number.
 */
export class FhirDecimal extends FhirPrimitiveType<number> {
  controlType = 'input';
  type: number;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * A Uniform Resource Identifier Reference (RFC 3986 ). Note: URIs are case
 * sensitive. For UUID (urn:uuid:53fefa32-fcbb-4ff8-8a92-55ee120877b7) use all
 * lowercase.
 *
 * URIs can be absolute or relative, and may have an optional fragment
 * identifier.
 */
export class FhirUri extends FhirPrimitiveType<string> {
  controlType = 'input';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * A stream of bytes, base64 encoded (RFC 4648 ).
 */
export class FhirBase64Binary extends FhirPrimitiveType<string> {
  controlType = 'input';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * An instant in time - known at least to the second and always includes a
 * time zone. Note: This is intended for precisely observed times (typically
 * system logs etc.), and not human-reported times - for them, use date and
 * dateTime. instant is a more constrained dateTime.
 *
 * Note: This type is for system times, not human times (see date and dateTime
 * below).
 */
export class FhirInstant extends FhirPrimitiveType<string> {
  controlType = 'input';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * A date, or partial date (e.g. just year or year + month) as used in human
 * communication. There is no time zone. Dates SHALL be valid dates.
 *
 * Regex: -?[0-9]{4}(-(0[1-9]|1[0-2])(-(0[0-9]|[1-2][0-9]|3[0-1]))?)?
 */
export class FhirDate extends FhirPrimitiveType<string> {
  controlType = 'input';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * A date, date-time or partial date (e.g. just year or year + month) as used
 * in human communication. If hours and minutes are specified, a time zone
 * SHALL be populated. Seconds must be provided due to schema type constraints
 * but may be zero-filled and may be ignored. Dates SHALL be valid dates. The
 * time "24:00" is not allowed.
 *
 * Regex: -?[0-9]{4}(-(0[1-9]|1[0-2])(-(0[0-9]|[1-2][0-9]|3[0-1])
 * (T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?(Z|(\+|-)
 * ((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?
 */
export class FhirDateTime extends FhirPrimitiveType<string> {
  controlType = 'dateTime';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * A date, date-time or partial date (e.g. just year or year + month) as used
 * in human communication. If hours and minutes are specified, a time zone
 * SHALL be populated. Seconds must be provided due to schema type constraints
 * but may be zero-filled and may be ignored. Dates SHALL be valid dates. The
 * time "24:00" is not allowed
 *
 * Regex: -?[0-9]{4}(-(0[1-9]|1[0-2])(-(0[0-9]|[1-2][0-9]|3[0-1])
 * (T([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9](\.[0-9]+)?(Z|(\+|-)
 * ((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?
 */
export class FhirTime extends FhirPrimitiveType<string> {
  controlType = 'input';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * Indicates that the value is taken from a set of controlled strings defined
 * elsewhere (see Using codes for further discussion). Technically, a code is
 * restricted to a string which has at least one character and no leading or
 * trailing whitespace, and where there is no whitespace other than single
 * spaces in the contents.
 *
 * Regex: [^\s]+([\s]?[^\s]+)*
 */
export class FhirCode extends FhirPrimitiveType<string> {
  controlType = 'dropdown';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
/**
 * An OID represented as a URI (RFC 3001 ); e.g. urn:oid:1.2.3.4.5
 *
 * Regex: urn:oid:[0-2](\.[1-9]\d*)+
 */
export class FhirOid extends FhirPrimitiveType<string> {
  controlType = 'input';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * Any combination of upper or lower case ASCII letters ('A'..'Z', and
 * 'a'..'z', numerals ('0'..'9'), '-' and '.', with a length limit of 64
 * characters. (This might be an integer, an un-prefixed OID, UUID or any
 * other identifier pattern that meets these constraints.).
 *
 * Regex: [A-Za-z0-9\-\.]{1,64}
 */
export class FhirId extends FhirPrimitiveType<string> {
  controlType = 'input';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * A string that may contain markdown syntax for optional processing by a
 * markdown presentation engine.
 */
export class FhirMarkdown extends FhirPrimitiveType<string> {
  controlType = 'input';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * Any non-negative integer (e.g. >= 0).
 *
 * Regex: [0]|([1-9][0-9]*)
 */
export class FhirUnsignedInt extends FhirPrimitiveType<number> {
  controlType = 'input';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
/**
 * Any positive integer (e.g. >= 1).
 *
 * Regex: +?[1-9][0-9]*
 */
export class FhirPositiveInt extends FhirPrimitiveType<number> {
  controlType = 'input';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
