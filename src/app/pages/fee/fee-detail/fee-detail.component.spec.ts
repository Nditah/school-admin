import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeDetailComponent } from './fee-detail.component';

describe('FeeDetailComponent', () => {
  let component: FeeDetailComponent;
  let fixture: ComponentFixture<FeeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
