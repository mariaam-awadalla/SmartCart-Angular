import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserRegister } from 'src/app/core/interface/user-register';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  errMsg: string = ``;
  isLoading: boolean = false;
  registerId!: Subscription;
  registerForm: FormGroup = this._FormBuilder.group(
    {
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)],
      ],
      rePassword: [''],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
      ],
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
      this.registerId = this._AuthService.register(userData).subscribe({
        next: (response) => {
          if (response.message == 'success') {
            this._Router.navigate(['/login']);
            this.isLoading = false;
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
    if (this.registerId) {
      this.registerId.unsubscribe();
    }
  }
}
