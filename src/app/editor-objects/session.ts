import { Log } from './log';

/**
 * Represents a session/tab in the application. Holds all required information
 * to operate the editor with that information. Doesn't require to be initiated
 * with anything as blank sessions can be created.
 */
export class Session {
  capabilityStatement: any;
  log: Log;
  availableTypes: Array<any>;
  availablefields: string[];
  // Search criteria variables
  id: number;
  //name: string;
  connectedServer: string;
  selectedResourceType: string;
  selectedSearchField: string;
  searchValue: string;
  // Create section variables
  createResourceType: string;
  // Settings variables
  settingsResourceType: string;
  settingsResourceStructure: any;


  constructor(public name?: string) {
    // Default value for tab name
    if (typeof this.name === "undefined") {
      this.name = "untitled";
    }

    this.log = new Log;
    this.availableTypes = [];
    this.availablefields = ['Name', 'Description', 'ID', 'URL', 'Identifier', 'Version'];
  }


}
