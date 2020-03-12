import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CashBuyComponent} from './cash-buy.component';

describe('CashBuyComponent', () => {
  let component: CashBuyComponent;
  let fixture: ComponentFixture<CashBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
