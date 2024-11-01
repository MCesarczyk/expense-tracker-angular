import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

interface UserFormType {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent {
  private readonly authService = inject(AuthService);
  private router = inject(Router);

  userForm = new FormGroup<UserFormType>({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  })

  errorMessage$ = new BehaviorSubject<string | null>(null);

  get emailInvalidAndTouched(): boolean {
    return (
      this.userForm.controls.email.invalid &&
      this.userForm.controls.email.touched
    )
  }

  get fEmail(): FormControl {
    return this.userForm.controls.email;
  }

  get passwordInvalidAndTouched(): boolean {
    return (
      this.userForm.controls.password.invalid &&
      this.userForm.controls.password.touched
    )
  }

  get fPassword(): FormControl {
    return this.userForm.controls.password;
  }

  submitForm() {
    if (this.userForm.valid && this.userForm.dirty) {
      this.errorMessage$.next(null);
      const { email, password } = this.userForm.getRawValue();
      this.authService.loginUser({ email, password }).pipe(take(1)).subscribe({
        next: () => {
          console.log(`[LoginFormComponent] submitForm - success`);
          this.router.navigate(['/expenses']);
        },
        error: (err) => {
          if (err instanceof HttpErrorResponse) {
            this.errorMessage$.next(err.error.message);
          } else {
            this.errorMessage$.next('An error occurred. Please try again later.');
          }
          console.error(`[LoginFormComponent] submitForm - error: ${err?.message}`);
        }
      });
    }
  }
}
