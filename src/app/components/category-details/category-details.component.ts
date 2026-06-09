import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from 'src/app/core/interface/category';
import { Subcategory } from 'src/app/core/interface/subcategory';

@Component({
  selector: 'app-category-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
})
export class CategoryDetailsComponent implements OnInit, OnDestroy {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService
  ) {}
  categoryId: string | null = '';
  parmId!: Subscription;
  specificCategoryId!: Subscription;
  subCategoryId!: Subscription;
  categoryData!: Category;
  subCategoryData!: Subcategory[];
  ngOnInit(): void {
    this.parmId = this._ActivatedRoute.paramMap.subscribe({
      next: (parm) => {
        this.categoryId = parm.get('id');
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.specificCategoryId = this._ProductService
      .getSpecificCategory(this.categoryId)
      .subscribe({
        next: (response) => {
          this.categoryData = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    this.subCategoryId = this._ProductService
      .getSubCategoryInCategory(this.categoryId)
      .subscribe({
        next: (response) => {
          this.subCategoryData = response.data;
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
    if (this.specificCategoryId) {
      this.specificCategoryId.unsubscribe();
    }
    if (this.subCategoryId) {
      this.subCategoryId.unsubscribe();
    }
  }
}
