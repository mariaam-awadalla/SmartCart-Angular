import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private _HttpClient: HttpClient) {}

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);
  addToCart(productAddId: string | null): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: productAddId,
      }
    );
  }
  getCart(): Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`);
  }
  removeItem(id: string | null): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`
    );
  }
  removeCart(): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`
    );
  }
  updateCart(prodCount: number, id: string | null): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        count: prodCount,
      }
    );
  }
  checkOut(id: string | null, userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://abdulhamidsameh.github.io/fresh_cart/`,
      {
        shippingAddress: userData,
      }
    );
  }
  getAllOrders(id: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`
    );
  }

  cashOrder(id: string | null, userData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
      {
        shippingAddress: userData,
      }
    );
  }
}
