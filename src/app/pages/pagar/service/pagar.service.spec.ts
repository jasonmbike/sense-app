import { TestBed } from '@angular/core/testing';

import { PagarService } from './pagar.service';

describe('PagarService', () => {
  let service: PagarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
