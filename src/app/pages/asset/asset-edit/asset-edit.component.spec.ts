import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetEditComponent } from './asset-edit.component';

describe('AssetEditComponent', () => {
  let component: AssetEditComponent;
  let fixture: ComponentFixture<AssetEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
