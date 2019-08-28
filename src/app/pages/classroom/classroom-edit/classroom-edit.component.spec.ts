import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomEditComponent } from './classroom-edit.component';

describe('ClassroomEditComponent', () => {
  let component: ClassroomEditComponent;
  let fixture: ComponentFixture<ClassroomEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
