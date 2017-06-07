import { Component, Input, OnInit } from '@angular/core';
import {SelectModule} from 'ng-select';

import { FhirService }                from '../fhir.service';
import { Session } from '../editor-objects/session';
import { SavedResource } from '../editor-objects/saved-resource';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {

  @Input() activeSession: Session;
  @Input() savedResources: SavedResource[];

  constructor(private fhirService: FhirService) { }

  public searchForResource() {
    // Destroy the old search result
    this.activeSession.searchResult.length = 0;
    this.fhirService.search(this.activeSession.connectedServer,
                            this.activeSession.selectedResourceType,
                            this.activeSession.selectedSearchField,
                            this.activeSession.searchValue)
                    .subscribe(
                      any => {
                        // When we get back a an object
                        this.updateSearchResults(any);
                        console.log(this.activeSession.searchResult);
                        this.activeSession.log.info(`Successfully searched the server.`)
                      },
                      error => {
                        // When we hit a error
                        this.activeSession.log.error("Search failed.")
                      }
                    );
  }

  private updateSearchResults(any: any) {
    //if(typeof any. === "undefined")
    // For each search result
    for(let entry of any.entry) {
      // An object to hold a search result
      let obj = {
        resourceType: entry.resource.resourceType,
        id: entry.resource.id,
        name: this.formatName( entry.resource.name )
      };
      this.activeSession.searchResult.push(obj);
    }
  }

  private formatName(name: any): string[] {
    let names = [];
    // For each name in the name object
    for(let obj of name) {
      // Get this names last name
      let last = obj.family.toString();
      let n = new String();
      // Get this names list of first names 
      for(let f of obj.given) {
        n.concat( f.toString() );
        n.concat( ' ' );
      }
      n.concat( ', ' );
      n.concat( last );
      names.push( n );
    }
    return names;
  }

}
