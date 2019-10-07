import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomAddComponent } from './classroom-add.component';

describe('ClassroomAddComponent', () => {
  let component: ClassroomAddComponent;
  let fixture: ComponentFixture<ClassroomAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassroomAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassroomAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
