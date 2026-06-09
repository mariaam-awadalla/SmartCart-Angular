import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interface/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2
  ) {}
  id: string | null = '';
  productDetails!: Product;
  parmId!: Subscription;
  specificProductId!: Subscription;
  addProductId!: Subscription;
  productSlider: OwlOptions = {
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
  };
  ngOnInit(): void {
    this.parmId = this._ActivatedRoute.paramMap.subscribe({
      next: (parm) => {
        this.id = parm.get('id');
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.specificProductId = this._ProductService
      .getSpecificProduct(this.id)
      .subscribe({
        next: (response) => {
          this.productDetails = response.data;
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

  ngOnDestroy(): void {
    if (this.specificProductId) {
      this.specificProductId.unsubscribe();
    }
    if (this.parmId) {
      this.parmId.unsubscribe();
    }
    if (this.addProductId) {
      this.addProductId.unsubscribe();
    }
  }
}
