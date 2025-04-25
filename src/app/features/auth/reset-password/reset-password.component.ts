import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from '@angular/router';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  otpForm: FormGroup;
  isSubmitted = false;
  isOtpSent = false;
  isOtpVerified = false;
  isSuccess = false;
  errorMessage = '';
  email = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alertService: AlertService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = '';

    if (this.resetForm.valid) {
      this.email = this.resetForm.value.email;
      // This would normally call an authentication service to send OTP
      console.log('Reset password requested for:', this.email);

      // Simulate API call success - OTP sent
      setTimeout(() => {
        this.isOtpSent = true;
        this.alertService.success(`Código de verificação enviado para ${this.email}`);
      }, 1000);
    }
  }

  onVerifyOtp() {
    if (this.otpForm.valid) {
      // This would normally call an authentication service to verify OTP
      console.log('Verifying OTP:', this.otpForm.value.otp, 'for email:', this.email);

      // Simulate API call success - OTP verified
      setTimeout(() => {
        this.isOtpVerified = true;
        this.isSuccess = true;
        this.alertService.success('Verificação concluída com sucesso! Você pode agora definir uma nova senha.');
      }, 1000);
    } else {
      this.errorMessage = 'Por favor, insira um código OTP válido.';
      this.alertService.error('Por favor, insira um código OTP válido.');
    }
  }

  resendOtp() {
    // This would normally call an authentication service to resend OTP
    console.log('Resending OTP for:', this.email);

    // Simulate API call success
    setTimeout(() => {
      this.errorMessage = '';
      this.alertService.info(`Novo código de verificação enviado para ${this.email}`);
    }, 1000);
  }

  backToEmail() {
    this.isOtpSent = false;
    this.isSubmitted = false;
    this.errorMessage = '';
    this.otpForm.reset();
  }

  backToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
