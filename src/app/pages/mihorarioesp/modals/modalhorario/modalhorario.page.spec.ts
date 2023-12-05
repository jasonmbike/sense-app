import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalhorarioPage } from './modalhorario.page';

describe('ModalhorarioPage', () => {
  let component: ModalhorarioPage;
  let fixture: ComponentFixture<ModalhorarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalhorarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
