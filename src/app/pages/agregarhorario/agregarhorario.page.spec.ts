import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarhorarioPage } from './agregarhorario.page';

describe('AgregarhorarioPage', () => {
  let component: AgregarhorarioPage;
  let fixture: ComponentFixture<AgregarhorarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarhorarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
