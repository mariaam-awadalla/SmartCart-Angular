import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _HttpClient: HttpClient) {}

  getAllProduct(pageNum: number = 1): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`
    );
  }
  getSpecificProduct(id: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
  }
  getAllCategories(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
  }
  getSpecificCategory(id: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`
    );
  }
  getSubCategoryInCategory(id: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
    );
  }
  getAllBrands(): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
  }
  getSpecificBrand(id: string | null): Observable<any> {
    return this._HttpClient.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`
    );
  }
}
