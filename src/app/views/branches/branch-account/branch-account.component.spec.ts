import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAccountComponent } from './branch-account.component';

describe('BranchAccountComponent', () => {
  let component: BranchAccountComponent;
  let fixture: ComponentFixture<BranchAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
