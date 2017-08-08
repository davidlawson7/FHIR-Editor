import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComplexDatatypeComponent } from './form-complex-datatype.component';

describe('FormComplexDatatypeComponent', () => {
  let component: FormComplexDatatypeComponent;
  let fixture: ComponentFixture<FormComplexDatatypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComplexDatatypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComplexDatatypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
