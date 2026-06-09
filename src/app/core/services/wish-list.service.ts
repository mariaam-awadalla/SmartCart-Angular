import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(private _HttpClient: HttpClient) {}
  whishNum: BehaviorSubject<number> = new BehaviorSubject(0);
  addToWishlist(id: string | null): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      {
        productId: id,
      }
    );
  }
  removeFromWishlist(id: string | null): Observable<any> {
    return this._HttpClient.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`
    );
  }
  getWishlist(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/wishlist`
    );
  }
}
