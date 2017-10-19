import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { SelectModule  } from 'ng2-select';

import { FhirPrimitiveType } from '../primitive-datatypes';
import { FhirService } from '../fhir.service';
import { ResourceControlService }    from '../resource-control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [ResourceControlService]
})
export class FormComponent implements OnInit {

  @Input() resourceElements: any[];
  @Input() existingResourceData: {};
  @Input() resourceBuilt: boolean;

  public form: FormGroup;
  public availableFields = [];
  currentFields: string[] = [];

  constructor(
    private fhirService: FhirService,
    private rcs: ResourceControlService,
  ) { }

  ngOnInit() {
    console.log(`INITALIZE FORM: ${this.resourceElements[0]}`);
    console.log(this.resourceElements);
    console.log(this.existingResourceData);
    console.log(this.form);
    console.log("End of initializing process");
    this.availableFields = this.fhirService.getResourceFields(this.resourceElements[0]);
  }

  ngOnChanges() {
    if (this.resourceElements != null) {
      if (this.existingResourceData != null) {
        //this.questions = this.existingData;
        this.transformResource();
      }
      this.form = this.rcs.toFormGroup(this.resourceElements);
      console.log(this.form);
      for (let element of this.resourceElements) {
        console.log(element);
      }
    }
  }

  transformResource() {
    let field = this.resourceElements[0];
    Object.keys(this.existingResourceData).forEach(key => {
      // Create form elements
      if (key != 'resourceType') {
        let obj: any[] = this.fhirService.createResourceField(field, key, this.currentFields);

        // add value to obj
        if (obj instanceof Array) {
          if (obj[0] instanceof FhirPrimitiveType) {
            // Primitive datatype
            obj[0].value = this.existingResourceData[key];
          } else if (obj[0] instanceof Array) {
            // Complex type
            this.transformComplex(obj[0], this.existingResourceData[key]);
          } else if (obj instanceof String) {
            // ignore

          }
        }
        this.resourceElements.push(obj[0]);

      }
    });
    if (this.resourceElements != null) {
      // Convert into formgroup
      this.form = this.rcs.toFormGroup(this.resourceElements);
      console.log(this.form);
      // Add values to question
    }

  }

  transformComplex(resourceElements: any[], data: any) {
    console.log("================== transofmring complex ====================");
    console.log("data");
    console.log(data);
    if (data instanceof Array) {
      for (let item in data) {
        Object.keys(item).forEach(key => {
          console.log(key);
          for (let i = 2; i < resourceElements.length; i++) {
            if (resourceElements[i] instanceof FhirPrimitiveType) {
              if (resourceElements[i].label == key) {
                resourceElements[i].value = item[key];
              }
            } else if (resourceElements[i] instanceof Array) {
              if (resourceElements[0] == key) {
                this.transformComplex(resourceElements, item[key]);
              }
            }
          }
        });
      }
    } else {
      Object.keys(data).forEach(key => {
        console.log(key);
        for (let i = 2; i < resourceElements.length; i++) {
          if (resourceElements[i] instanceof FhirPrimitiveType) {
            if (resourceElements[i].label == key) {
              resourceElements[i].value = data[key];
            }
          } else if (resourceElements[i] instanceof Array) {
            if (resourceElements[0] == key) {
              this.transformComplex(resourceElements, data[key]);
            }
          }
        }
      });
    }

    console.log("resourceElements");
    console.log(resourceElements);

    /*for (let element of resourceElements) {
      if (element instanceof FhirPrimitiveType) {
        // Primitive datatype

        if (element.label == key) {
          console.log(`label: ${element.label}, key: ${key}`);
          element.value = this.data[key];
          console.log(`data: ${this.data}`);
          console.log(`data: ${this.existingResourceData[key]}`);
          console.log(`form label: ${element.label}`);

        }
      } else if (element instanceof Array) {
        // Complex type

        if (element[0] == key) {
          console.log(`label: ${element[0]}, key: ${key}`);
          this.transformComplex(element, this.existingResourceData[key]);
        }
      } else if (element instanceof String) {
        // ignore

      }
    }*/
  }


  isArray(obj: any) {
    return Array.isArray(obj)
  }

  dataFormComponent(value: any): void { }

  selectedFormComponent(value: any): void {

    let obj: any[] = this.fhirService.createResourceField(this.resourceElements[0], value.text, this.currentFields);

    this.resourceElements.push(obj[0]);

    if (this.resourceElements != null) {
      this.form = this.rcs.toFormGroup(this.resourceElements);
    }
  }

  removedFormComponent(value: any): void { }

  public getTooltip(): string {

    return 'none';
  }

}
