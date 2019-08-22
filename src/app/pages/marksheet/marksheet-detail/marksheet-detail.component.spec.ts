import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksheetDetailComponent } from './marksheet-detail.component';

describe('MarksheetDetailComponent', () => {
  let component: MarksheetDetailComponent;
  let fixture: ComponentFixture<MarksheetDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarksheetDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksheetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
