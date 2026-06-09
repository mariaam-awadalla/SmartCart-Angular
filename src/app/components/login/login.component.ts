import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserLogin } from 'src/app/core/interface/user-login';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  errMsg: string = ``;
  isLoading: boolean = false;
  loginId!: Subscription;
  private _loginForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],
    ],
  });
  public get loginForm(): FormGroup {
    return this._loginForm;
  }
  public set loginForm(value: FormGroup) {
    this._loginForm = value;
  }

  handelForm(): void {
    this.isLoading = true;
    const userData: UserLogin = this.loginForm.value;
    if (this.loginForm.valid) {
      this.loginId = this._AuthService.login(userData).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            localStorage.setItem('etoken', response.token);
            this._AuthService.decodeUser();
            this._Router.navigate(['/home']);
            this.isLoading = false;
          }
        },
        error: (err) => {
          console.log(err);
          this.errMsg = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }
  ngOnDestroy(): void {
    if (this.loginId) {
      this.loginId.unsubscribe();
    }
  }
}
