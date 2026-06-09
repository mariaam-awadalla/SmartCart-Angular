import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout.component').then(
        (m) => m.BlankLayoutComponent
      ),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./components/cart/cart.component').then(
            (m) => m.CartComponent
          ),
        title: 'Cart',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./components/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'productDetails/:id',
        loadComponent: () =>
          import('./components/product-details/product-details.component').then(
            (m) => m.ProductDetailsComponent
          ),
        title: 'Product Details',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./components/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
        title: 'Brands',
      },
      {
        path: 'whishList',
        loadComponent: () =>
          import('./components/wish-list/wish-list.component').then(
            (m) => m.WishListComponent
          ),
        title: 'Wish List',
      },
      {
        path: 'brandsDetails/:id',
        loadComponent: () =>
          import('./components/brands-detalis/brands-detalis.component').then(
            (m) => m.BrandsDetalisComponent
          ),
        title: 'Brands Details',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./components/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'All Orders',
      },
      {
        path: 'cashOrder/:id',
        loadComponent: () =>
          import('./components/cash-order/cash-order.component').then(
            (m) => m.CashOrderComponent
          ),
        title: 'Cash Order',
      },
      {
        path: 'resetCode',
        loadComponent: () =>
          import('./components/reset-code/reset-code.component').then(
            (m) => m.ResetCodeComponent
          ),
        title: 'Reset Code',
      },
      {
        path: 'forgetPassword',
        loadComponent: () =>
          import('./components/forget-password/forget-password.component').then(
            (m) => m.ForgetPasswordComponent
          ),
        title: 'Forget Password',
      },
      {
        path: 'newPassword',
        loadComponent: () =>
          import('./components/new-password/new-password.component').then(
            (m) => m.NewPasswordComponent
          ),
        title: 'New Password',
      },
      {
        path: 'payment/:id',
        loadComponent: () =>
          import('./components/payment/payment.component').then(
            (m) => m.PaymentComponent
          ),
        title: 'Online Payment',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./components/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'updatePassword',
        loadComponent: () =>
          import('./components/update-password/update-password.component').then(
            (m) => m.UpdatePasswordComponent
          ),
        title: 'Update Password',
      },
      {
        path: 'updateUserInfo',
        loadComponent: () =>
          import(
            './components/update-user-info/update-user-info.component'
          ).then((m) => m.UpdateUserInfoComponent),
        title: 'Update User Info',
      },

      {
        path: 'categoryDetails/:id',
        loadComponent: () =>
          import(
            './components/category-details/category-details.component'
          ).then((m) => m.CategoryDetailsComponent),
        title: 'Categories',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (m) => m.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      {
        path: 'authResetCode',
        loadComponent: () =>
          import('./components/reset-code/reset-code.component').then(
            (m) => m.ResetCodeComponent
          ),
        title: 'Reset Code',
      },
      {
        path: 'authForgetPassword',
        loadComponent: () =>
          import('./components/forget-password/forget-password.component').then(
            (m) => m.ForgetPasswordComponent
          ),
        title: 'Forget Password',
      },
      {
        path: 'authNewPassword',
        loadComponent: () =>
          import('./components/new-password/new-password.component').then(
            (m) => m.NewPasswordComponent
          ),
        title: 'New Password',
      },

      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title: 'Register',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: 'Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
