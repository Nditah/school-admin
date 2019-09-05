import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountClassAddComponent } from './account-class-add.component';

describe('AccountClassAddComponent', () => {
  let component: AccountClassAddComponent;
  let fixture: ComponentFixture<AccountClassAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountClassAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountClassAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
