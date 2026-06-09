import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControlOptions,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserRegister } from 'src/app/core/interface/user-register';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-user-info.component.html',
  styleUrls: ['./update-user-info.component.scss'],
})
export class UpdateUserInfoComponent implements OnDestroy {
  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService
  ) {}

  errMsg: string = ``;
  isLoading: boolean = false;
  updateUserInfoId!: Subscription;
  registerForm: FormGroup = this._FormBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(10)],
    ],
    email: ['', [Validators.required, Validators.email]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
  });
  handelForm(): void {
    this.isLoading = true;
    const userData: UserRegister = this.registerForm.value;
    if (this.registerForm.valid) {
      this.updateUserInfoId = this._AuthService
        .updateUserInfo(userData)
        .subscribe({
          next: (response) => {
            if (response.message == 'success') {
              this._Router.navigate(['/home']);
              this.isLoading = false;
              this._ToastrService.success('User Info Update Successfully');
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
    if (this.updateUserInfoId) {
      this.updateUserInfoId.unsubscribe();
    }
  }
}
