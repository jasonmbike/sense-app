import { TestBed } from '@angular/core/testing';

import { LoginRestablecerContrasenaService } from './login-restablecer-contrasena.service';

describe('LoginRestablecerContrasenaService', () => {
  let service: LoginRestablecerContrasenaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRestablecerContrasenaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
