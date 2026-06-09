import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from 'src/app/core/interface/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy {
  constructor(private _ProductService: ProductService) {}
  getAllCategoriesId!: Subscription;
  categories: Category[] = [];
  ngOnInit(): void {
    this.getAllCategoriesId = this._ProductService
      .getAllCategories()
      .subscribe({
        next: (response) => {
          this.categories = response.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {
    if (this.getAllCategoriesId) {
      this.getAllCategoriesId.unsubscribe();
    }
  }
}
