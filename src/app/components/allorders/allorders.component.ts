import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/core/interface/order';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss'],
})
export class AllordersComponent implements OnInit, OnDestroy {
  constructor(
    private _AuthService: AuthService,
    private _CartService: CartService
  ) {}
  userData: any;
  userId: string | null = '';
  allOrdersId!: Subscription;
  orderData: Order[] = [];
  ngOnInit(): void {
    this._AuthService.decodeUser();
    this.userData = this._AuthService.userInfo;
    this.userId = this.userData.id;
    this.allOrdersId = this._CartService.getAllOrders(this.userId).subscribe({
      next: (response) => {
        this.orderData = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    if (this.allOrdersId) {
      this.allOrdersId.unsubscribe();
    }
  }
}
