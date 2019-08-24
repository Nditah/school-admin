import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarksheetEditComponent } from './marksheet-edit.component';

describe('MarksheetEditComponent', () => {
  let component: MarksheetEditComponent;
  let fixture: ComponentFixture<MarksheetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarksheetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarksheetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
