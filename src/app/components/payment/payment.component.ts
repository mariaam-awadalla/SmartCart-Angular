import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/core/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _FormBuilder: FormBuilder,
    private _CartService: CartService
  ) {}
  cartId: string | null = '';
  parmId!: Subscription;
  checkOutId!: Subscription;
  orderForm: FormGroup = this._FormBuilder.group({
    details: [''],
    phone: [''],
    city: [''],
  });
  ngOnInit(): void {
    this.parmId = this._ActivatedRoute.paramMap.subscribe({
      next: (parms) => {
        this.cartId = parms.get('id');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  handelForm(): void {
    this.checkOutId = this._CartService
      .checkOut(this.cartId, this.orderForm.value)
      .subscribe({
        next: (response) => {
          if (response.status == 'success') {
            window.open(response.session.url, '_self');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {
    if (this.parmId) {
      this.parmId.unsubscribe();
    }
    if (this.checkOutId) {
      this.checkOutId.unsubscribe();
    }
  }
}
