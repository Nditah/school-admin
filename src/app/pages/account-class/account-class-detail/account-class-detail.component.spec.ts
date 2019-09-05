import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountClassDetailComponent } from './account-class-detail.component';

describe('AccountClassDetailComponent', () => {
  let component: AccountClassDetailComponent;
  let fixture: ComponentFixture<AccountClassDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountClassDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountClassDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
