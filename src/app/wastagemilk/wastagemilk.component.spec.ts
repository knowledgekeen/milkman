import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WastagemilkComponent } from './wastagemilk.component';

describe('WastagemilkComponent', () => {
  let component: WastagemilkComponent;
  let fixture: ComponentFixture<WastagemilkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WastagemilkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WastagemilkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
