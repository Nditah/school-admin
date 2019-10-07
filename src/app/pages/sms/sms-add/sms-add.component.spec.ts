import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsAddComponent } from './sms-add.component';

describe('SmsAddComponent', () => {
  let component: SmsAddComponent;
  let fixture: ComponentFixture<SmsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
