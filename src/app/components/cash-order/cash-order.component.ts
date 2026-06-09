import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cash-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cash-order.component.html',
  styleUrls: ['./cash-order.component.scss'],
})
export class CashOrderComponent {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _FormBuilder: FormBuilder,
    private _CartService: CartService,
    private _Router: Router,
    private _ToastrService: ToastrService
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
      .cashOrder(this.cartId, this.orderForm.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          this._Router.navigate(['/home']);
          this._ToastrService.success('Success');
          this._CartService.cartNumber.next(0);
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
