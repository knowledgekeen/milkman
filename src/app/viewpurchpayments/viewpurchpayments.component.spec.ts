import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpurchpaymentsComponent } from './viewpurchpayments.component';

describe('ViewpurchpaymentsComponent', () => {
  let component: ViewpurchpaymentsComponent;
  let fixture: ComponentFixture<ViewpurchpaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpurchpaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpurchpaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
