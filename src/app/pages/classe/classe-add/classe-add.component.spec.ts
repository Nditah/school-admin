import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseAddComponent } from './classe-add.component';

describe('ClasseAddComponent', () => {
  let component: ClasseAddComponent;
  let fixture: ComponentFixture<ClasseAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
