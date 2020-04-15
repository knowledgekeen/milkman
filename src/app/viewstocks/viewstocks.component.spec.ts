import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstocksComponent } from './viewstocks.component';

describe('ViewstocksComponent', () => {
  let component: ViewstocksComponent;
  let fixture: ComponentFixture<ViewstocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewstocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
