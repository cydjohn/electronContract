import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteContractComponent } from './delete-contract.component';

describe('DeleteContractComponent', () => {
  let component: DeleteContractComponent;
  let fixture: ComponentFixture<DeleteContractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteContractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
