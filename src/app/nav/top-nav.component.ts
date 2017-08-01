import { Component, Input } from '@angular/core';
import { Session } from '../editor-objects/session';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent {

  @Input() activeSession: Session;
  @Input() title: string;

  constructor() { }



}
