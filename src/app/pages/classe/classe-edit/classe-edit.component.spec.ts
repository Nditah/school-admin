import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseEditComponent } from './classe-edit.component';

describe('ClasseEditComponent', () => {
  let component: ClasseEditComponent;
  let fixture: ComponentFixture<ClasseEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
