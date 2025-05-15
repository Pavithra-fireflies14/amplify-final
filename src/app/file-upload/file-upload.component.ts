import { Component } from '@angular/core';
import * as Storage from 'aws-amplify/storage';

'aws-amplify';
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileuploadComponent {

  selectedFile?: File;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  async uploadFile() {
    if (!this.selectedFile) {
      return;
    }

    try {
      const result = await Storage.uploadData({
        key:`upload/${this.selectedFile.name}`, data: this.selectedFile, options: {
        contentType: this.selectedFile.type,
      }});
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
}

