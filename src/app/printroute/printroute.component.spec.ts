import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintrouteComponent } from './printroute.component';

describe('PrintrouteComponent', () => {
  let component: PrintrouteComponent;
  let fixture: ComponentFixture<PrintrouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintrouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintrouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
