import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-code',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reset-code.component.html',
  styleUrls: ['./reset-code.component.scss'],
})
export class ResetCodeComponent implements OnDestroy {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  errMsg: string = ``;
  isLoading: boolean = false;
  resetCodeId!: Subscription;
  resetCodeForm: FormGroup = this._FormBuilder.group({
    resetCode: [''],
  });
  handelForm(): void {
    this.isLoading = true;
    const resetCode: object = this.resetCodeForm.value;
    if (this.resetCodeForm.valid) {
      this.resetCodeId = this._AuthService.resetCode(resetCode).subscribe({
        next: (response) => {
          console.log(response);
          this.isLoading = false;
          if (localStorage.getItem('etoken')) {
            this._Router.navigate(['/newPassword']);
          } else {
            this._Router.navigate(['/authNewPassword']);
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
    if (this.resetCodeId) {
      this.resetCodeId.unsubscribe();
    }
  }
}
