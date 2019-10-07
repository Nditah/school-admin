import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentEditComponent } from './parent-edit.component';

describe('ParentEditComponent', () => {
  let component: ParentEditComponent;
  let fixture: ComponentFixture<ParentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
