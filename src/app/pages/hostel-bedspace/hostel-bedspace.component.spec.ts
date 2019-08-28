import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostelBedspaceComponent } from './hostel-bedspace.component';

describe('HostelBedspaceComponent', () => {
  let component: HostelBedspaceComponent;
  let fixture: ComponentFixture<HostelBedspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostelBedspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostelBedspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
