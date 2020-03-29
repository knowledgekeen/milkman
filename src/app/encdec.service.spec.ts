import { TestBed } from '@angular/core/testing';

import { EncdecService } from './encdec.service';

describe('EncdecService', () => {
  let service: EncdecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EncdecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
