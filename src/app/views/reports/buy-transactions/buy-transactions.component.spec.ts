import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTransactionsComponent } from './buy-transactions.component';

describe('BuyTransactionsComponent', () => {
  let component: BuyTransactionsComponent;
  let fixture: ComponentFixture<BuyTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
