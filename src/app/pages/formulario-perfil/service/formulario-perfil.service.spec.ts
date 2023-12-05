import { TestBed } from '@angular/core/testing';

import { FormularioPerfilService } from './formulario-perfil.service';

describe('PerfilService', () => {
  let service: FormularioPerfilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioPerfilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});