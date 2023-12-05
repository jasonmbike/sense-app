import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRestablecerContrasenaPage } from './login-restablecer-contrasena.page';

describe('LoginRestablecerContrasenaPage', () => {
  let component: LoginRestablecerContrasenaPage;
  let fixture: ComponentFixture<LoginRestablecerContrasenaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginRestablecerContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
