/**
 * Represents a session/tab in the application. Holds all required information
 * to operate the editor with that information. Doesn't require to be initiated
 * with anything as blank sessions can be created.
 */
export class Session {
  id: number;
  name: string;
  connectedServer: string;
  selectedResourceType: string;
  selectedSearchField: string;
  searchValue: string;

  availableTypes = ['Patient', 'Person', 'Practitioner'];
  availablefields = ['Name', 'Description', 'ID', 'URL', 'Identifier', 'Version'];
}
