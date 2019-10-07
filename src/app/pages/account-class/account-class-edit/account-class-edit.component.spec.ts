import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountClassEditComponent } from './account-class-edit.component';

describe('AccountClassEditComponent', () => {
  let component: AccountClassEditComponent;
  let fixture: ComponentFixture<AccountClassEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountClassEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountClassEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
