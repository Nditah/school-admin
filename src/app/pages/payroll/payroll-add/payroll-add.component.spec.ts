import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollAddComponent } from './payroll-add.component';

describe('PayrollAddComponent', () => {
  let component: PayrollAddComponent;
  let fixture: ComponentFixture<PayrollAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
