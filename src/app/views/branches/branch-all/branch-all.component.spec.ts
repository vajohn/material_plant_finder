import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchAllComponent } from './branch-all.component';

describe('BranchAllComponent', () => {
  let component: BranchAllComponent;
  let fixture: ComponentFixture<BranchAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
