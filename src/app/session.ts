import { FormGroup }                  from '@angular/forms';

/**
 * Represents a session/tab in the application. Holds all required information
 * to operate the editor with that information. Doesn't require to be initiated
 * with anything as blank sessions can be created.
 */
export class Session {
  // General infomoration about session
  general: General;
  // Search related information in session
  search: Search;
  // For information about creating a resource
  create: {
    type: String
  }
  // Settings related information
  settings: {
    settingsResourceType: String
  }
  // Active tab information
  active: {
    activeObject: any,
    form: FormGroup
  }

  capabilityStatement: any;
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
  activeObjectArray: Array<any>;
  built: boolean;
  form: FormGroup;
  payLoad = '';
  canBuild: boolean;

  constructor(public name?: string) {
    // Default value for tab name
    if (typeof this.name === "undefined") {
      this.name = "untitled";
    }

    this.general = new General();
    this.search = new Search();
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
    this.activeObjectArray = [];
    this.built = false;
  }


}

class General {
  endpoint: string;
  capabilityStatement: any;
  availableTypes: Array<any>;
  availablefields: Array<any>;
  resourceDefinitions: Array<any>;
  complexDatatypeDefinitions: Array<any>;

  constructor() {
    this.endpoint = '';
    this.capabilityStatement = null;
    this.availableTypes = [];
    this.availablefields = [{
      label: "Name",
      value: "name"
    }, {
        label: "ID",
        value: "id"
      }];
    this.resourceDefinitions = [];
    this.complexDatatypeDefinitions = [];
  }
}

class Search {
  name: string;
  type: string;
  field: string;
  value: string;

  constructor() {
    this.name = '';
    this.type = '';
    this.field = '';
    this.value = '';
  }
}
