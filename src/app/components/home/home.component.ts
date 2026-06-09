import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interface/product';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { Category } from 'src/app/core/interface/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishListService } from 'src/app/core/services/wish-list.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CutTextPipe,
    CarouselModule,
    RouterLink,
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
    private _WishListService: WishListService
  ) {}
  getAllProductId!: Subscription;
  getAllCategoriesId!: Subscription;
  addProductId!: Subscription;
  addToWishlistId!: Subscription;
  removeWishlistId!: Subscription;
  wishlistId!: Subscription;
  products: Product[] = [];
  categories: Category[] = [];
  whishListData: string[] = [];
  term: string = '';
  ngOnInit(): void {
    this.getAllProductId = this._ProductService.getAllProduct().subscribe({
      next: (response) => {
        this.products = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getAllCategoriesId = this._ProductService
      .getAllCategories()
      .subscribe({
        next: (response) => {
          this.categories = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.wishlistId = this._WishListService.getWishlist().subscribe({
      next: (response) => {
        this._WishListService.whishNum.next(response.count);

        for (let i = 0; i < response.data.length; i++) {
          this.whishListData.push(response.data[i]._id);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  categoryCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 7,
      },
    },
    nav: true,
    autoplay: true,
    autoplayTimeout: 7000,
    autoplaySpeed: 1000,
  };
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
  };
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
  addToWishList(id: string | null) {
    this.addToWishlistId = this._WishListService.addToWishlist(id).subscribe({
      next: (response) => {
        this.whishListData = response.data;
        this._WishListService.whishNum.next(response.data.length);
        console.log(response);

        this._ToastrService.success('Product Added Successfully To Wishlist');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  removeWishList(id: string | null) {
    this.removeWishlistId = this._WishListService
      .removeFromWishlist(id)
      .subscribe({
        next: (response) => {
          this.whishListData = response.data;
          this._WishListService.whishNum.next(response.data.length);
          console.log(response);

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
    if (this.getAllProductId) {
      this.getAllProductId.unsubscribe();
    }
    if (this.getAllCategoriesId) {
      this.getAllCategoriesId.unsubscribe();
    }
    if (this.addProductId) {
      this.addProductId.unsubscribe();
    }
    if (this.addToWishlistId) {
      this.addToWishlistId.unsubscribe();
    }
    if (this.removeWishlistId) {
      this.removeWishlistId.unsubscribe();
    }
    if (this.wishlistId) {
      this.wishlistId.unsubscribe();
    }
  }
}
