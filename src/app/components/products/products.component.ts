import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interface/product';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/core/pipe/cut-text.pipe';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink, CutTextPipe, NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  constructor(
    private _ProductService: ProductService,
    private _Renderer2: Renderer2,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}
  pageSize: number = 0; //limit
  currentPage: number = 0; //currentPage
  total: number = 0; //results
  products: Product[] = [];
  getAllProductId!: Subscription;
  addProductId!: Subscription;
  ngOnInit(): void {
    this.getAllProductId = this._ProductService.getAllProduct().subscribe({
      next: (response) => {
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
        this.products = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  pageChanged(event: any): void {
    this.getAllProductId = this._ProductService.getAllProduct(event).subscribe({
      next: (response) => {
        this.pageSize = response.metadata.limit;
        this.currentPage = response.metadata.currentPage;
        this.total = response.results;
        this.products = response.data;
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
    if (this.getAllProductId) {
      this.getAllProductId.unsubscribe();
    }
    if (this.addProductId) {
      this.addProductId.unsubscribe();
    }
  }
}
