import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnDestroy {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  forgetPasswordId!: Subscription;
  errMsg: string = ``;
  isLoading: boolean = false;
  loginId!: Subscription;
  emailForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  handelForm(): void {
    this.isLoading = true;
    const userData: object = this.emailForm.value;
    if (this.emailForm.valid) {
      this.forgetPasswordId = this._AuthService
        .forgetPassword(userData)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.isLoading = false;
            if (localStorage.getItem('etoken')) {
              this._Router.navigate(['/resetCode']);
            } else {
              this._Router.navigate(['/authResetCode']);
            }
          },
          error: (err) => {
            console.log(err);
            this.isLoading = false;
            this.errMsg = err.error.message;
          },
        });
    }
  }
  ngOnDestroy(): void {
    if (this.forgetPasswordId) {
      this.forgetPasswordId.unsubscribe();
    }
  }
}
