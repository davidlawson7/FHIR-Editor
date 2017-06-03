/**
 * Represents a FHIR Resource which has been saved for quick access. This class
 * does NOT save the entire resource, rather its machine id, type, server, and a
 * identifying factor.
 */
export class SavedResource {
  public id: string;
  public type: string;
  public server: string;
  public name: string;

  constructor(id: string, type: string, server: string, name: string) {
    this.id = id;
    this.type = type;
    this.server = server;
    this.name = name;
  }
}
