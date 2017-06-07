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
  availablefields: Array<any>;
  // Search criteria variables
  id: number;
  //name: string;
  connectedServer: string;
  selectedResourceType: string;
  selectedSearchField: string;
  searchValue: string;
  searchResult: Array<any>;
  // Create section variables
  createResourceType: string;
  // Settings variables
  settingsResourceType: string;
  settingsResourceStructure: any;

  activeObject: any;


  constructor(public name?: string) {
    // Default value for tab name
    if (typeof this.name === "undefined") {
      this.name = "untitled";
    }

    this.log = new Log;
    this.availableTypes = [];
    this.availablefields = [{
      label: "Name",
      value: "name"
    }, {
      label: "ID",
      value: "id"
    }
  ];
    this.searchResult = [];
    this.activeObject = null;
  }

}
