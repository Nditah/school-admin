import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurriculumEditComponent } from './curriculum-edit.component';

describe('CurriculumEditComponent', () => {
  let component: CurriculumEditComponent;
  let fixture: ComponentFixture<CurriculumEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurriculumEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurriculumEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
