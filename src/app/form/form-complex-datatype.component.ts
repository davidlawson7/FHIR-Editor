import { Component, OnInit, Input } from '@angular/core';
import { FhirPrimitiveType }          from '../datatypes/primitive-datatypes';
import { FormGroup }                  from '@angular/forms';


@Component({
  selector: 'df-complex',
  templateUrl: './form-complex-datatype.component.html',
  styleUrls: ['./form-complex-datatype.component.css']
})
export class FormComplexDatatypeComponent implements OnInit {

  @Input() complexdatatype: any[] = [];
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit() {
    console.log(`Processinging complex: ${this.complexdatatype}`)
    console.log(this.form);
    console.log("TADA");
  }

  addFieldArray() {

  }

  fieldExists(field: string): boolean {
    for (let item of this.complexdatatype) {
      if (item.key == `_${field}`) {
        return true;
      }
    }
    return false;
  }

  complexFieldExists(field: string): boolean {
    for (let item of this.complexdatatype) {
      if (Array.isArray(item) && item[1] == field) {
        return true;
      }
    }
    return false;
  }

  getField(field: string): any {
    for (let item of this.complexdatatype) {
      if (item.key == `_${field}`) {
        return item;
      }
    }
  }

  getComplexField(field: string): any[] {
    for (let item of this.complexdatatype) {
      if (Array.isArray(item) && item[1] == field) {
        return item;
      }
    }
  }

  isArray(obj: any) {
    return Array.isArray(obj);
  }
}
