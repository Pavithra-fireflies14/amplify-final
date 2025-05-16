import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { resetPassword, confirmResetPassword } from 'aws-amplify/auth';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {
  email: string = '';
  code: string = '';
  newPassword: string = '';

  step: 'request' | 'confirm' = 'request';
  errorMessage: string = '';
  infoMessage: string = '';
  constructor(private router: Router) {

  }
  async requestResetCode() {
    this.errorMessage = '';
    try {
      await resetPassword({ username: this.email });
      this.infoMessage = `Code sent to ${this.email}`;
      this.step = 'confirm';
    } catch (error: any) {
      console.error('Reset request error:', error);
      this.errorMessage = error.message || 'Failed to send reset code.';
    }
  }

  async confirmPasswordReset() {
    this.errorMessage = '';
    try {
      await confirmResetPassword({
        username: this.email,
        confirmationCode: this.code,
        newPassword: this.newPassword
      });
      this.infoMessage = 'Password reset successful. You can now login.';
      // Optionally, redirect to login:
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Confirm reset error:', error);
      this.errorMessage = error.message || 'Failed to reset password.';
    }
  }
}
