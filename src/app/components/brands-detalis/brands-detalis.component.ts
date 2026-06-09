import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { Brand } from 'src/app/core/interface/brand';

@Component({
  selector: 'app-brands-detalis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands-detalis.component.html',
  styleUrls: ['./brands-detalis.component.scss'],
})
export class BrandsDetalisComponent implements OnInit, OnDestroy {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService
  ) {}
  brandId: string | null = '';
  parmId!: Subscription;
  specificBrandId!: Subscription;
  brandData!: Brand;
  ngOnInit(): void {
    this.parmId = this._ActivatedRoute.paramMap.subscribe({
      next: (parm) => {
        this.brandId = parm.get('id');
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.specificBrandId = this._ProductService
      .getSpecificBrand(this.brandId)
      .subscribe({
        next: (response) => {
          this.brandData = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {
    if (this.parmId) {
      this.parmId.unsubscribe();
    }
    if (this.specificBrandId) {
      this.specificBrandId.unsubscribe();
    }
  }
}
