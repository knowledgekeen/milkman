import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsalepaymentsComponent } from './viewsalepayments.component';

describe('ViewsalepaymentsComponent', () => {
  let component: ViewsalepaymentsComponent;
  let fixture: ComponentFixture<ViewsalepaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsalepaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsalepaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
