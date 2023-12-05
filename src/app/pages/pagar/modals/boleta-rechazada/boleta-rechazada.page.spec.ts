import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoletaRechazadaPage } from './boleta-rechazada.page';

describe('BoletaRechazadaPage', () => {
  let component: BoletaRechazadaPage;
  let fixture: ComponentFixture<BoletaRechazadaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BoletaRechazadaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
