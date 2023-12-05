import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregaryeditarPage } from './agregaryeditar.page';

describe('AgregaryeditarPage', () => {
  let component: AgregaryeditarPage;
  let fixture: ComponentFixture<AgregaryeditarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregaryeditarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
