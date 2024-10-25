import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

interface LoginFormType {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  private readonly authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup<LoginFormType>({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  })

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

  submitForm() {
    if (this.loginForm.valid && this.loginForm.dirty) {
      const { email, password } = this.loginForm.getRawValue();
      this.authService.loginUser({ email, password }).pipe(take(1)).subscribe({
        next: () => {
          this.router.navigate(['/expenses']);
        },
        error: (err) => {
          console.error(`[LoginFormComponent] submitForm - error: ${err?.message}`);
        }
      });
    }
  }
}
