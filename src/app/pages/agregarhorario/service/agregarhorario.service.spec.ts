import { TestBed } from '@angular/core/testing';

import { AgregarhorarioService } from './agregarhorario.service';

describe('AgregarhorarioService', () => {
  let service: AgregarhorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarhorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
