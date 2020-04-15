import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewroutedetsComponent } from './viewroutedets.component';

describe('ViewroutedetsComponent', () => {
  let component: ViewroutedetsComponent;
  let fixture: ComponentFixture<ViewroutedetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewroutedetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewroutedetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
