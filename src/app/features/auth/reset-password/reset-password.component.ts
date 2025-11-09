import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '../../../core/services/alert.service';
import { AuthActions } from '../../../core/state/auth/authActions';
import { authSelectors } from '../../../core/state/auth/auth.selectors';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnDestroy {
  resetForm: FormGroup;
  otpForm: FormGroup;
  newPasswordForm: FormGroup;
  isSubmitted = false;
  isOtpSent = false;
  isOtpVerified = false;
  isSuccess = false;
  errorMessage = '';
  email = '';
  resetToken = '';
  hidePassword = true;
  hideConfirmPassword = true;
  otpValues: string[] = ['', '', '', '', '', ''];

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
    private actions$: Actions,
    private alertService: AlertService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Create form controls for each OTP digit
    const otpControls: { [key: string]: any } = {};
    for (let i = 0; i < 6; i++) {
      otpControls[`digit${i}`] = ['', [Validators.required, Validators.pattern('^[0-9]$')]];
    }
    this.otpForm = this.fb.group(otpControls);

    this.newPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: ResetPasswordComponent.passwordMatchValidator });

    this.isLoading$ = this.store.select(authSelectors.loading);
    this.error$ = this.store.select(authSelectors.error);

    // Subscribe to error state
    this.error$.pipe(takeUntil(this.destroy$)).subscribe(error => {
      if (error) {
        this.errorMessage = error;
      }
    });

    // Listen to forgot password success
    this.actions$.pipe(
      ofType(AuthActions.forgotPasswordSuccess),
      takeUntil(this.destroy$)
    ).subscribe(({ message }) => {
      this.isOtpSent = true;
      this.errorMessage = '';
      this.alertService.success(message || `Código de verificação enviado para ${this.email}`);
      // Focus first OTP input after a short delay
      setTimeout(() => {
        const firstInput = document.getElementById('otp-0') as HTMLInputElement;
        if (firstInput) {
          firstInput.focus();
        }
      }, 100);
    });

    // Listen to verify reset password success
    this.actions$.pipe(
      ofType(AuthActions.verifyResetPasswordSuccess),
      takeUntil(this.destroy$)
    ).subscribe(({ message }) => {
      this.isOtpVerified = true;
      this.errorMessage = '';
      this.alertService.success(message || 'Código verificado com sucesso! Agora você pode definir uma nova senha.');
    });

    // Listen to reset password success
    this.actions$.pipe(
      ofType(AuthActions.resetPasswordWithTokenSuccess),
      takeUntil(this.destroy$)
    ).subscribe(({ message }) => {
      this.isSuccess = true;
      this.errorMessage = '';
      this.alertService.success(message || 'Senha redefinida com sucesso! Você pode fazer login agora.');
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  static passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = '';
    this.store.dispatch(AuthActions.clearError());

    if (this.resetForm.valid) {
      this.email = this.resetForm.value.email;
      this.store.dispatch(AuthActions.forgotPassword({ email: this.email }));
    }
  }

  onVerifyOtp() {
    this.errorMessage = '';
    this.store.dispatch(AuthActions.clearError());

    // Combine all OTP digits into a single string
    const otpValue = this.otpValues.join('');

    if (otpValue.length === 6 && /^\d{6}$/.test(otpValue)) {
      this.resetToken = otpValue;
      this.store.dispatch(AuthActions.verifyResetPassword({ resetToken: this.resetToken }));
    } else {
      this.errorMessage = 'Por favor, insira um código OTP válido de 6 dígitos.';
      this.alertService.error('Por favor, insira um código OTP válido de 6 dígitos.');
    }
  }

  onOtpInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Handle paste - extract digits
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      digits.forEach((digit, i) => {
        if (i < 6) {
          this.otpValues[i] = digit;
          this.otpForm.get(`digit${i}`)?.setValue(digit);
        }
      });
      // Focus the last filled input or the last input
      const lastIndex = Math.min(digits.length - 1, 5);
      const lastInput = document.getElementById(`otp-${lastIndex}`) as HTMLInputElement;
      if (lastInput) {
        lastInput.focus();
      }
      // Auto-submit if all filled
      if (this.otpValues.every(d => d !== '') && this.otpValues.join('').length === 6) {
        setTimeout(() => this.onVerifyOtp(), 100);
      }
      return;
    }

    // Only allow single digit
    if (/^\d$/.test(value)) {
      this.otpValues[index] = value;
      this.otpForm.get(`digit${index}`)?.setValue(value);
      // Move to next input if available
      if (index < 5 && value) {
        const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    } else if (value === '') {
      this.otpValues[index] = '';
      this.otpForm.get(`digit${index}`)?.setValue('');
    } else {
      input.value = this.otpValues[index] || '';
      return;
    }

    // Auto-submit when all 6 digits are filled
    if (this.otpValues.every(d => d !== '') && this.otpValues.join('').length === 6) {
      setTimeout(() => this.onVerifyOtp(), 100);
    }
  }

  onOtpKeyDown(event: KeyboardEvent, index: number) {
    // Handle backspace to go to previous input
    if (event.key === 'Backspace' && !this.otpValues[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
        prevInput.select();
      }
    }

    // Prevent non-numeric keys
    if (!/^[0-9]$/.test(event.key) &&
      !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key) &&
      !(event.ctrlKey || event.metaKey)) {
      event.preventDefault();
    }
  }

  onOtpPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text') || '';
    const digits = pastedText.replace(/\D/g, '').slice(0, 6).split('');

    digits.forEach((digit, i) => {
      if (i < 6) {
        this.otpValues[i] = digit;
        this.otpForm.get(`digit${i}`)?.setValue(digit);
      }
    });

    // Focus the last filled input or the last input
    const lastIndex = Math.min(digits.length - 1, 5);
    const lastInput = document.getElementById(`otp-${lastIndex}`) as HTMLInputElement;
    if (lastInput) {
      lastInput.focus();
    }

    // Auto-submit if all filled
    if (this.otpValues.every(d => d !== '') && this.otpValues.join('').length === 6) {
      setTimeout(() => this.onVerifyOtp(), 100);
    }
  }

  onResetPassword() {
    this.errorMessage = '';
    this.store.dispatch(AuthActions.clearError());

    if (this.newPasswordForm.valid) {
      const newPassword = this.newPasswordForm.value.newPassword;
      this.store.dispatch(AuthActions.resetPasswordWithToken({
        token: this.resetToken,
        newPassword
      }));
    } else {
      if (this.newPasswordForm.errors?.['passwordMismatch']) {
        this.errorMessage = 'As senhas não coincidem.';
        this.alertService.error('As senhas não coincidem.');
      } else {
        this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
        this.alertService.error('Por favor, preencha todos os campos corretamente.');
      }
    }
  }

  resendOtp() {
    if (this.email) {
      this.store.dispatch(AuthActions.forgotPassword({ email: this.email }));
      this.alertService.info(`Novo código de verificação será enviado para ${this.email}`);
    }
  }

  backToEmail() {
    this.isOtpSent = false;
    this.isSubmitted = false;
    this.errorMessage = '';
    this.otpForm.reset();
    this.otpValues = ['', '', '', '', '', ''];
    this.store.dispatch(AuthActions.clearError());
  }

  backToOtp() {
    this.isOtpVerified = false;
    this.errorMessage = '';
    this.newPasswordForm.reset();
    this.store.dispatch(AuthActions.clearError());
  }

  backToLogin() {
    this.router.navigate(['/auth/login']);
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  get hasOtpValues(): boolean {
    return this.otpValues.some(d => d !== '');
  }
}
