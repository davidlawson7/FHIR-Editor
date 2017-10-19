import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimitiveElementComponent } from './primitive-element.component';

describe('PrimitiveElementComponent', () => {
  let component: PrimitiveElementComponent;
  let fixture: ComponentFixture<PrimitiveElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimitiveElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimitiveElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
