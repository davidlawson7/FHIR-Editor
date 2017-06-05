/**
 * Represents a session/tab in the application. Holds all required information
 * to operate the editor with that information. Doesn't require to be initiated
 * with anything as blank sessions can be created.
 */
export class Session {
  capabilityStatement: any;
  log: any[];
  // Search criteria variables
  id: number;
  name: string;
  connectedServer: string;
  selectedResourceType: string;
  selectedSearchField: string;
  searchValue: string;
  // Create section variables
  createResourceType: string;
  // Settings variables
  settingsResourceType: string;
  settingsResourceStructure: any;

  availableTypes = ['Patient', 'Person', 'Practitioner'];
  availablefields = ['Name', 'Description', 'ID', 'URL', 'Identifier', 'Version'];

  constructor() { this.log = [] }
}
