import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentacionPage } from './documentacion.page';

describe('DocumentacionPage', () => {
  let component: DocumentacionPage;
  let fixture: ComponentFixture<DocumentacionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DocumentacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
