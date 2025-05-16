import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { confirmSignUp, signIn, resendSignUpCode } from 'aws-amplify/auth';

@Component({
  selector: 'app-confirmcode',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './confirmcode.component.html',
  styleUrl: './confirmcode.component.css'
})
export class ConfirmcodeComponent {

  email = '';
  password = '';
  code = '';
  errorMessage = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.password = params['password'] || '';
    });
    const storedEmail = localStorage.getItem('pendingConfirmationEmail');
    console.log("stored: " + storedEmail)
    if (storedEmail != null) {
      this.resendCode();
    }
  }

  async onConfirm() {
    this.errorMessage = '';
    try {
      await confirmSignUp({
        username: this.email,
        confirmationCode: this.code
      });

      const user = await signIn({ username: this.email, password: this.password });
      console.log('Login successful:', user);
      localStorage.removeItem("pendingConfirmationEmail");
      this.router.navigate(['/file-upload']);
    } catch (err: any) {
      this.errorMessage = err.message || 'Confirmation failed.';
    }
  }

  async resendCode() {
    this.errorMessage = '';
    try {
      await resendSignUpCode({ username: this.email });
      this.errorMessage = 'Confirmation code resent.';
    } catch (err: any) {
      this.errorMessage = err.message || 'Could not resend code.';
    }
  }
}
