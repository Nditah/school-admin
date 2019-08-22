import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksheetAddComponent } from './marksheet-add.component';

describe('MarksheetAddComponent', () => {
  let component: MarksheetAddComponent;
  let fixture: ComponentFixture<MarksheetAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarksheetAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksheetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
