import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieropeningbalComponent } from './supplieropeningbal.component';

describe('SupplieropeningbalComponent', () => {
  let component: SupplieropeningbalComponent;
  let fixture: ComponentFixture<SupplieropeningbalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplieropeningbalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplieropeningbalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
