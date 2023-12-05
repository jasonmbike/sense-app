import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioPerfilPage } from './formulario-perfil.page';

describe('FormularioPerfilPage', () => {
  let component: FormularioPerfilPage;
  let fixture: ComponentFixture<FormularioPerfilPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FormularioPerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
