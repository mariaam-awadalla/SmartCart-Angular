import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/core/services/cart.service';
import { Product } from 'src/app/core/interface/product';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  cartData: any;
  getCartId!: Subscription;
  removeItemId!: Subscription;
  clearCartId!: Subscription;
  updateCartId!: Subscription;
  ngOnInit(): void {
    this.getCartId = this._CartService.getCart().subscribe({
      next: (response) => {
        this.cartData = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  remove(id: string | null, btnId: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btnId, 'disabled', 'true');
    this.removeItemId = this._CartService.removeItem(id).subscribe({
      next: (response) => {
        this.cartData = response.data;
        this._ToastrService.success('Item Removed Successfully From Your Cart');
        this._Renderer2.removeAttribute(btnId, 'disabled');
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(btnId, 'disabled');
      },
    });
  }
  clearCart(btnClear: HTMLButtonElement): void {
    this._Renderer2.setAttribute(btnClear, 'disabled', 'true');
    this.clearCartId = this._CartService.removeCart().subscribe({
      next: (response) => {
        this.cartData = null;
        this._CartService.cartNumber.next(0);

        this._ToastrService.success('Your Cart Removed Successfully');
        this._Renderer2.removeAttribute(btnClear, 'disabled');
      },
      error: (err) => {
        console.log(err);
        this._Renderer2.removeAttribute(btnClear, 'disabled');
      },
    });
  }
  updateCount(
    id: string | null,
    prodCount: number,
    btn1: HTMLButtonElement,
    btn2: HTMLButtonElement
  ): void {
    if (prodCount >= 1) {
      this._Renderer2.setAttribute(btn1, 'disabled', 'true');
      this._Renderer2.setAttribute(btn2, 'disabled', 'true');
      this.updateCartId = this._CartService
        .updateCart(prodCount, id)
        .subscribe({
          next: (response) => {
            this.cartData = response.data;
            this._ToastrService.success('Quantity Change Successfully');
          },
          error: (err) => {
            console.log(err);
            this._Renderer2.removeAttribute(btn1, 'disabled');
            this._Renderer2.removeAttribute(btn2, 'disabled');
          },
        });
    } else {
      this._ToastrService.error('Minimum Quantity Is One');
      this._Renderer2.removeAttribute(btn1, 'disabled');
      this._Renderer2.removeAttribute(btn2, 'disabled');
    }
  }
  ngOnDestroy(): void {
    if (this.getCartId) {
      this.getCartId.unsubscribe();
    }
    if (this.removeItemId) {
      this.removeItemId.unsubscribe();
    }
    if (this.clearCartId) {
      this.clearCartId.unsubscribe();
    }
    if (this.updateCartId) {
      this.updateCartId.unsubscribe();
    }
  }
}
