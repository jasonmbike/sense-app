import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MihorarioespPage } from './mihorarioesp.page';

describe('MihorarioespPage', () => {
  let component: MihorarioespPage;
  let fixture: ComponentFixture<MihorarioespPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MihorarioespPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
