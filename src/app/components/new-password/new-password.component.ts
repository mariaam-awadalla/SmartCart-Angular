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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnDestroy {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  errMsg: string = ``;
  isLoading: boolean = false;
  updatePasswordId!: Subscription;
  loginId!: Subscription;
  newPasswordForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],
    ],
  });
  handelForm(): void {
    this.isLoading = true;
    const newData: object = this.newPasswordForm.value;
    if (this.newPasswordForm.valid) {
      this.updatePasswordId = this._AuthService
        .updatePassword(newData)
        .subscribe({
          next: (response) => {
            console.log(response);
            localStorage.setItem('etoken', response.token);
            this.isLoading = false;
            this._Router.navigate(['/home']);
            this._ToastrService.success('Password Change Successfully');
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
    if (this.updatePasswordId) {
      this.updatePasswordId.unsubscribe();
    }
  }
}
