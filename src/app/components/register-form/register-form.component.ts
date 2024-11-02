import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatchingPasswords } from '../../pages/register-page/matching-passwords.validator';
import { UserService } from '../../user/user.service';

interface RegisterFormType {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  passwordConfirm: FormControl<string>;
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  private readonly userService = inject(UserService);
  private router = inject(Router);

  loginForm = new FormGroup<RegisterFormType>({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    passwordConfirm: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    })
  },
    {
      validators: MatchingPasswords('password', 'passwordConfirm'),
      updateOn: 'blur'
    }
  )

  errorMessage$ = new BehaviorSubject<string | null>(null);

  get nameInvalidAndTouched(): boolean {
    return (
      this.loginForm.controls.name.invalid &&
      this.loginForm.controls.name.touched
    )
  }

  get fName(): FormControl {
    return this.loginForm.controls.name;
  }

  get emailInvalidAndTouched(): boolean {
    return (
      this.loginForm.controls.email.invalid &&
      this.loginForm.controls.email.touched
    )
  }

  get fEmail(): FormControl {
    return this.loginForm.controls.email;
  }

  get passwordInvalidAndTouched(): boolean {
    return (
      this.loginForm.controls.password.invalid &&
      this.loginForm.controls.password.touched
    )
  }

  get fPassword(): FormControl {
    return this.loginForm.controls.password;
  }

  get passwordConfirmInvalidAndTouched(): boolean {
    return (
      this.loginForm.controls.passwordConfirm.invalid &&
      this.loginForm.controls.passwordConfirm.touched
    )
  }

  get fPasswordConfirm(): FormControl {
    return this.loginForm.controls.passwordConfirm;
  }

  submitForm() {
    if (this.loginForm.valid && this.loginForm.dirty) {
      this.errorMessage$.next(null);
      const { name, email, password } = this.loginForm.getRawValue();
      this.userService.createUser({ name, email, password }).pipe(take(1)).subscribe({
        next: () => {
          console.log(`[RegisterFormComponent] submitForm - success`);
          this.router.navigate(['/expenses']);
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            this.errorMessage$.next(err.error.message);
          } else {
            this.errorMessage$.next('An error occurred. Please try again later.');
          }
          console.error(`[RegisterFormComponent] submitForm - error: ${err?.message}`);
        }
      });
    }
  }
}
