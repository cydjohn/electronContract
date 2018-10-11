import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTimeTableComponent } from './pay-time-table.component';

describe('PayTimeTableComponent', () => {
  let component: PayTimeTableComponent;
  let fixture: ComponentFixture<PayTimeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayTimeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
