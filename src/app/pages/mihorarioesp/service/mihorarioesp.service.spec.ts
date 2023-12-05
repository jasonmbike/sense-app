import { TestBed } from '@angular/core/testing';

import { MihorarioespService } from './mihorarioesp.service';

describe('MihorarioespService', () => {
  let service: MihorarioespService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MihorarioespService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
