import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashOrderComponent } from './cash-order.component';

describe('CashOrderComponent', () => {
  let component: CashOrderComponent;
  let fixture: ComponentFixture<CashOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CashOrderComponent]
    });
    fixture = TestBed.createComponent(CashOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
