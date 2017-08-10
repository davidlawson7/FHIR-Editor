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
  }

  isArray(obj: any) {
    return Array.isArray(obj)
  }
}
