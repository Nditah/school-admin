import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelAllocationComponent } from './hostel-allocation.component';

describe('HostelAllocationComponent', () => {
  let component: HostelAllocationComponent;
  let fixture: ComponentFixture<HostelAllocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelAllocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
