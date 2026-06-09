import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandsDetalisComponent } from './brands-detalis.component';

describe('BrandsDetalisComponent', () => {
  let component: BrandsDetalisComponent;
  let fixture: ComponentFixture<BrandsDetalisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrandsDetalisComponent]
    });
    fixture = TestBed.createComponent(BrandsDetalisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
