import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalespaymentComponent } from './salespayment.component';

describe('SalespaymentComponent', () => {
  let component: SalespaymentComponent;
  let fixture: ComponentFixture<SalespaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalespaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalespaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
