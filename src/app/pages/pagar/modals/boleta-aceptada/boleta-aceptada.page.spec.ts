import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletaAceptadaPage } from './boleta-aceptada.page';

describe('BoletaAceptadaPage', () => {
  let component: BoletaAceptadaPage;
  let fixture: ComponentFixture<BoletaAceptadaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BoletaAceptadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
