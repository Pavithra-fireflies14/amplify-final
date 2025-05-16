import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { signUp, confirmSignUp, signIn } from 'aws-amplify/auth';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  password = '';
  email = '';
  code = '';
  showConfirmation = false;
  errorMessage: string = '';

  constructor(private router: Router) {}

  async onSignup() {
    this.errorMessage = ''; // reset error on every try
    try {
      await signUp({
        username: this.email,
        password: this.password,
        options: {
          userAttributes: { email: this.email }
        }
      });
      this.router.navigate(['/confirm-code'], {
        queryParams: {
          email: this.email,
          password: this.password
        }
      });    } catch (error: any) {
      console.log('Signup error:', error);
      if (error.code === 'UsernameExistsException') {
        this.errorMessage = 'User already exists. Please try logging in.';
      } else if (error.code === 'InvalidPasswordException') {
        this.errorMessage = 'Password does not meet complexity requirements.';
      } else if (error.message) {
        this.errorMessage = error.message;  // fallback generic error message
      } else {
        this.errorMessage = 'An unknown error occurred. Please try again.';
      }
  }
}

async onConfirm() {
  this.errorMessage = ''; // reset error on each try
  try {
    await confirmSignUp({
      username: this.email,
      confirmationCode: this.code
    });
    console.log('Confirmation successful. Logging in...');

    const user = await signIn({ username: this.email, password: this.password });
    console.log('Login success:', user);

    this.router.navigate(['/file-upload']);
  } catch (error: any) {
    console.error('Confirmation or login failed', error);
    if (error.code === 'CodeMismatchException') {
      this.errorMessage = 'Invalid confirmation code. Please try again.';
    } else if (error.code === 'ExpiredCodeException') {
      this.errorMessage = 'Confirmation code expired. Please request a new one.';
    } else {
      this.errorMessage = error.message || 'An error occurred during confirmation.';
    }
  }
}
}
