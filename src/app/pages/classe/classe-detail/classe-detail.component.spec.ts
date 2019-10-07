import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseDetailComponent } from './classe-detail.component';

describe('ClasseDetailComponent', () => {
  let component: ClasseDetailComponent;
  let fixture: ComponentFixture<ClasseDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
