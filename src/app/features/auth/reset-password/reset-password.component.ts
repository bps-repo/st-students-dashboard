import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  isSubmitted = false;
  isSuccess = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = '';

    if (this.resetForm.valid) {
      // This would normally call an authentication service
      console.log('Reset password requested for:', this.resetForm.value.email);

      // Simulate API call success
      setTimeout(() => {
        this.isSuccess = true;
      }, 1000);
    }
  }

  backToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
