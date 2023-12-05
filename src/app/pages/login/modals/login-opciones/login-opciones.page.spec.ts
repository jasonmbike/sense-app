import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginOpcionesPage } from './login-opciones.page';

describe('LoginOpcionesPage', () => {
  let component: LoginOpcionesPage;
  let fixture: ComponentFixture<LoginOpcionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginOpcionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
