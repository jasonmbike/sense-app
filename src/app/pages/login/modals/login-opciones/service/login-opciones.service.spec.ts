import { TestBed } from '@angular/core/testing';

import { LoginOpcionesService } from './login-opciones.service';

describe('LoginOpcionesService', () => {
  let service: LoginOpcionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginOpcionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
