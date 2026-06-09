import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { Subscription } from 'rxjs';
import { WishListService } from 'src/app/core/services/wish-list.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss'],
})
export class NavBlankComponent implements OnInit, OnDestroy {
  constructor(
    private _Router: Router,
    private _CartService: CartService,
    private _Renderer2: Renderer2,
    private _WishListService: WishListService,
    private _AuthService: AuthService
  ) {}
  cartNum: number = 0;
  wishNum: number = 0;
  cartNumId!: Subscription;
  wishNumId!: Subscription;
  getCartId!: Subscription;
  userData: any;
  userName: string = '';
  @ViewChild('navBar') navElement!: ElementRef;
  @HostListener('window:scroll')
  onScroll(): void {
    if (scrollY > 300) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'px-5');
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'px-5');
    }
  }
  ngOnInit(): void {
    this._AuthService.decodeUser();
    this.userData = this._AuthService.userInfo;
    this.userName = this.userData.name;
    this.wishNumId = this._WishListService.whishNum.subscribe({
      next: (data) => {
        this.wishNum = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.cartNumId = this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartNum = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getCartId = this._CartService.getCart().subscribe({
      next: (response) => {
        this.cartNum = response.numOfCartItems;
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._AuthService.decodeUser();
  }
  signOut(): void {
    localStorage.removeItem('etoken');
    this._Router.navigate(['/login']);
  }
  ngOnDestroy(): void {
    if (this.cartNumId) {
      this.cartNumId.unsubscribe();
    }
    if (this.getCartId) {
      this.getCartId.unsubscribe();
    }
    if (this.wishNumId) {
      this.wishNumId.unsubscribe();
    }
  }
}
