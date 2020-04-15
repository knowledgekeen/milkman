import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InhouseprodComponent } from './inhouseprod.component';

describe('InhouseprodComponent', () => {
  let component: InhouseprodComponent;
  let fixture: ComponentFixture<InhouseprodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InhouseprodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InhouseprodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
