import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionAddComponent } from './admission-add.component';

describe('AdmissionAddComponent', () => {
  let component: AdmissionAddComponent;
  let fixture: ComponentFixture<AdmissionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
