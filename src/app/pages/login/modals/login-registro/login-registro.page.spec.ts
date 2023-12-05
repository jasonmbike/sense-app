import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRegistroPage } from './login-registro.page';

describe('LoginRegistroPage', () => {
  let component: LoginRegistroPage;
  let fixture: ComponentFixture<LoginRegistroPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginRegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
