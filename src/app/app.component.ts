import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { FileuploadComponent } from './file-upload/file-upload.component';
import { SignupComponent } from './signup/signup.component';

Amplify.configure(outputs);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, SignupComponent],
})
export class AppComponent {
  title = 'amplify-angular-template';
}
