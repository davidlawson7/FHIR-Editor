import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FhirPrimitiveType } from '../primitive-datatypes';

@Component({
  selector: 'complex-element',
  templateUrl: './complex-element.component.html',
  styleUrls: ['./complex-element.component.css']
})
export class ComplexElementComponent implements OnInit {

  @Input() complexDatatype: any[] = [];
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
    console.log(`INITALIZE COMPLEX: ${this.complexDatatype[0]}`);
    console.log(this.complexDatatype);
    console.log(this.form);
    console.log("End of initializing process");
  }

  fieldExists(field: string): boolean {
    for (let item of this.complexDatatype) {
      if (item.key == `_${field}`) {
        return true;
      }
    }
    return false;
  }

  complexFieldExists(field: string): boolean {
    for (let item of this.complexDatatype) {
      if (Array.isArray(item) && item[1] == field) {
        return true;
      }
    }
    return false;
  }

  getField(field: string): any {
    for (let item of this.complexDatatype) {
      if (item.key == `_${field}`) {
        return item;
      }
    }
  }

  getComplexField(field: string): any[] {
    for (let item of this.complexDatatype) {
      if (Array.isArray(item) && item[1] == field) {
        return item;
      }
    }
  }

  isArray(obj: any) {
    return Array.isArray(obj);
  }

}
