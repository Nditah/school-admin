import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesPaymentComponent } from './fees-payment.component';

describe('FeesPaymentComponent', () => {
  let component: FeesPaymentComponent;
  let fixture: ComponentFixture<FeesPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
