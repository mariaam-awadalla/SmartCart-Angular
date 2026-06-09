import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/interface/product';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CutTextPipe],
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit, OnDestroy {
  constructor(
    private _WishListService: WishListService,
    private _Renderer2: Renderer2,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  getWishlistId!: Subscription;
  addProductId!: Subscription;
  removeFromWishlistId!: Subscription;
  products: Product[] = [];
  whishListData: string[] = [];

  ngOnInit(): void {
    this.getList();
  }
  getList(): void {
    this.getWishlistId = this._WishListService.getWishlist().subscribe({
      next: (response) => {
        this.products = response.data;
        for (let i = 0; i < response.data.length; i++) {
          this.whishListData.push(response.data[i]._id);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addProduct(productId: string | null, element: HTMLButtonElement): void {
    this._Renderer2.setAttribute(element, 'disabled', 'true');
    this.addProductId = this._CartService.addToCart(productId).subscribe({
      next: (response) => {
        this._Renderer2.removeAttribute(element, 'disabled');
        this._ToastrService.success(response.message);
        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
        this._ToastrService.error(err.message);
        console.log(err);
      },
    });
  }

  removeWishList(id: string | null) {
    this.removeFromWishlistId = this._WishListService
      .removeFromWishlist(id)
      .subscribe({
        next: (response) => {
          this.getList();
          this.whishListData = response.data;
          this._WishListService.whishNum.next(response.data.length);
          this._ToastrService.success(
            'Product Remove Successfully From Wish List '
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {
    if (this.getWishlistId) {
      this.getWishlistId.unsubscribe();
    }
    if (this.addProductId) {
      this.addProductId.unsubscribe();
    }

    if (this.removeFromWishlistId) {
      this.removeFromWishlistId.unsubscribe();
    }
  }
}
