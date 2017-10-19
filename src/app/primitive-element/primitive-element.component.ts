import { Component, Input, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FhirPrimitiveType } from '../primitive-datatypes';

@Component({
  selector: 'primitive-element',
  templateUrl: './primitive-element.component.html',
  styleUrls: ['./primitive-element.component.css']
})
export class PrimitiveElementComponent implements OnInit {

  @Input() resourceElement: FhirPrimitiveType<any>;
  @Input() form: FormGroup;
  @Input() tooltip: string;

  constructor() { }

  ngOnInit() {
  }

  get isValid() {
    //return this.form.controls[this.question.key].valid;
    return true;
  }
}
