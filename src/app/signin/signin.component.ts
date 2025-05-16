import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { signIn, signOut, fetchUserAttributes } from 'aws-amplify/auth';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

    password = '';
    email = '';
    code = '';
    showConfirmation = false;
    errorMessage: string = '';
  
    constructor(private router: Router) {}
  
    async onSignIn() {
      this.errorMessage = '';
      console.log('Attempting sign in...');
      try {
        await signOut(); // Ensure any session is cleared
      } catch (e) {
        console.log('Sign out error (safe to ignore if user wasn’t signed in):', e);
      }
      try {
        const user = await signIn({ username: this.email, password: this.password });
        console.log('Sign in success:', user);
    
        // After successful sign-in, check email_verified flag
        const attributes = await fetchUserAttributes();
        console.log(attributes)

        if (user.nextStep.signInStep == "CONFIRM_SIGN_UP") {
          localStorage.setItem('pendingConfirmationEmail', this.email);
          this.router.navigate(['/confirm-code']);
        } else {
          // User confirmed
          this.router.navigate(['/file-upload']);
        }
      } catch (error: any) {
        console.error('Signin error:', error);
    
        if (error.name === 'UserUnAuthenticatedException') {
          localStorage.setItem('pendingConfirmationEmail', this.email);
          this.router.navigate(['/confirm-code'], {
            queryParams: {
              email: this.email,
              password: this.password
            }
          });
        } else if (error.message) {
          this.errorMessage = error.message;
        } else {
          this.errorMessage = 'An unknown error occurred.';
        }
      }
  }
  
 
}
