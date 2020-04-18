import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentbookComponent } from './paymentbook.component';

describe('PaymentbookComponent', () => {
  let component: PaymentbookComponent;
  let fixture: ComponentFixture<PaymentbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
