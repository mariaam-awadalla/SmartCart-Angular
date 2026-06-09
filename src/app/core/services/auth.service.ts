import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable, retry } from 'rxjs';
import { UserRegister } from '../interface/user-register';
import { UserLogin } from '../interface/user-login';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}
  userInfo: any;

  register(userData: UserRegister): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      userData
    );
  }
  login(userData: UserLogin): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      userData
    );
  }
  forgetPassword(emailData: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      emailData
    );
  }
  resetCode(code: object): Observable<any> {
    return this._HttpClient.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      code
    );
  }
  updatePassword(newPass: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      newPass
    );
  }
  decodeUser(): void {
    const encode = localStorage.getItem('etoken');
    if (encode !== null) {
      const decode = jwtDecode(encode);
      this.userInfo = decode;
    }
  }
  updateLoggedPassword(newPass: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
      newPass
    );
  }

  updateUserInfo(newPass: object): Observable<any> {
    return this._HttpClient.put(
      `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
      newPass
    );
  }
}
