import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasepaymentComponent } from './purchasepayment.component';

describe('PurchasepaymentComponent', () => {
  let component: PurchasepaymentComponent;
  let fixture: ComponentFixture<PurchasepaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasepaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
