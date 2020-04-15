import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilkroutesComponent } from './milkroutes.component';

describe('MilkroutesComponent', () => {
  let component: MilkroutesComponent;
  let fixture: ComponentFixture<MilkroutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilkroutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilkroutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
