import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexElementComponent } from './complex-element.component';

describe('ComplexElementComponent', () => {
  let component: ComplexElementComponent;
  let fixture: ComponentFixture<ComplexElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
