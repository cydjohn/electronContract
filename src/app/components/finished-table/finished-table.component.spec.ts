import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedTableComponent } from './finished-table.component';

describe('FinishedTableComponent', () => {
  let component: FinishedTableComponent;
  let fixture: ComponentFixture<FinishedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinishedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
