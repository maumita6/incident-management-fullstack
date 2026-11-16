import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { LoginPayload, RegisterPayload, RegisterResponse } from '../../../shared/models/auth.model';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../state/auth/auth.actions';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-register',
  styleUrl: './register.css',
  templateUrl: './register.html',
  standalone: true

})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private store = inject(Store);

  isLoading = signal(false);
  errorMessage = signal('');

  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    roles: ['user', [Validators.required]]
  });

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage.set('Please fill in all required fields correctly.');
      return;
    }

    //const { username, email, password, confirmPassword, roles } = this.registerForm.value as RegisterPayload;
    const { username, email, password, confirmPassword, roles } = this.registerForm.getRawValue();

    if (password !== confirmPassword) {
      this.errorMessage.set('Passwords do not match.');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.store.dispatch(AuthActions.registerRequest({ username, email, password, confirmPassword, roles }))

    /*this.authService.register(username, email, password, confirmPassword, roles as string[]).subscribe({
      next: (response: RegisterResponse) => {
        this.isLoading.set(false);
        if (response.success) {
          this.router.navigate(['/login']);
        } else {
          this.errorMessage.set(response.message || 'Registration failed. Please try again.');
        }
      },
      error: (error) => {
        this.errorMessage.set(error.message || 'Registration failed. Please try again.');
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });*/
  }

}
