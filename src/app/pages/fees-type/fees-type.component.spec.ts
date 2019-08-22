import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesTypeComponent } from './fees-type.component';

describe('FeesTypeComponent', () => {
  let component: FeesTypeComponent;
  let fixture: ComponentFixture<FeesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
