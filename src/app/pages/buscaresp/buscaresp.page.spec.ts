import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarespPage } from './buscaresp.page';

describe('BuscarespPage', () => {
  let component: BuscarespPage;
  let fixture: ComponentFixture<BuscarespPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BuscarespPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
