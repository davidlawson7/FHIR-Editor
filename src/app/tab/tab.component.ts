import { Component, Output, Input } from '@angular/core';
import { Tabs } from '../tabs/tabs.component';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class Tab {
  @Input() tabTitle;
  public active: boolean;

  constructor(tabs: Tabs) {
    tabs.addTab(this)
  }
}
