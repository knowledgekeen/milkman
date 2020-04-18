import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeropeningbalComponent } from './customeropeningbal.component';

describe('CustomeropeningbalComponent', () => {
  let component: CustomeropeningbalComponent;
  let fixture: ComponentFixture<CustomeropeningbalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomeropeningbalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomeropeningbalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
