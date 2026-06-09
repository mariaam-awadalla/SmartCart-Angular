import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRegister } from 'src/app/core/interface/user-register';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
})
export class UpdatePasswordComponent implements OnDestroy {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  errMsg: string = ``;
  isLoading: boolean = false;
  updatePasswordId!: Subscription;
  registerForm: FormGroup = this._FormBuilder.group(
    {
      currentPassword: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],
      ],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],
      ],
      rePassword: [''],
    },
    { validators: [this.confirmPassword] } as FormControlOptions
  );
  confirmPassword(group: FormGroup): void {
    const password = group.get('password');
    const rePassword = group.get('rePassword');
    if (rePassword?.value == '') {
      rePassword.setErrors({
        required: true,
      });
    } else if (password?.value != rePassword?.value) {
      rePassword?.setErrors({
        mismatch: true,
      });
    }
  }
  handelForm(): void {
    this.isLoading = true;
    const userData: UserRegister = this.registerForm.value;
    if (this.registerForm.valid) {
      this.updatePasswordId = this._AuthService
        .updateLoggedPassword(userData)
        .subscribe({
          next: (response) => {
            if (response.message == 'success') {
              this._Router.navigate(['/home']);
              this.isLoading = false;
              this._ToastrService.success('Password Update Successfully');
            }
            console.log(response);
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
    if (this.updatePasswordId) {
      this.updatePasswordId.unsubscribe();
    }
  }
}
