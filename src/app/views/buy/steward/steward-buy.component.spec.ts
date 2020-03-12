import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {StewardBuyComponent} from './steward-buy.component';

describe('StewardBuyComponent', () => {
  let component: StewardBuyComponent;
  let fixture: ComponentFixture<StewardBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StewardBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StewardBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
