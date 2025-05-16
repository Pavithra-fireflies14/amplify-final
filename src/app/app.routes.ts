import { Routes } from '@angular/router';
import { FileuploadComponent } from './file-upload/file-upload.component';
import { SigninComponent } from './signin/signin.component';
import { ConfirmcodeComponent } from './confirmcode/confirmcode.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

export const routes: Routes = [
    {
        path: 'file-upload',
        component: FileuploadComponent
      },
      {
        path: 'signup',
        loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)
      },
      {
        path: 'login',
        component: SigninComponent
      },
      {
        path: 'confirm-code',
        component: ConfirmcodeComponent
      },
      {
        path: 'forgot-password',
        component: ForgotpasswordComponent},
      {
        path: '',
        redirectTo: 'signup',
        pathMatch: 'full'
      }
];
