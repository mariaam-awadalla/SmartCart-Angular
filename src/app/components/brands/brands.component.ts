import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Brand } from 'src/app/core/interface/brand';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss'],
})
export class BrandsComponent implements OnInit, OnDestroy {
  constructor(private _ProductService: ProductService) {}
  brands: Brand[] = [];
  allBrandsId!: Subscription;
  ngOnInit(): void {
    this.allBrandsId = this._ProductService.getAllBrands().subscribe({
      next: (response) => {
        this.brands = response.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    if (this.allBrandsId) {
      this.allBrandsId.unsubscribe();
    }
  }
}
