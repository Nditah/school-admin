import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDetailComponent } from './staff-detail.component';

describe('StaffDetailComponent', () => {
  let component: StaffDetailComponent;
  let fixture: ComponentFixture<StaffDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
