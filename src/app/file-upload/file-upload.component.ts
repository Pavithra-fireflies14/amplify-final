import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import * as Storage from 'aws-amplify/storage';
import { getCurrentUser, signOut } from "aws-amplify/auth"
import { Router } from '@angular/router';
import { getUrl, list } from 'aws-amplify/storage';

'aws-amplify';
@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileuploadComponent {
 user: any;
  constructor(private router: Router) {}

  selectedFile?: File;
  s3Files: string[] = [];
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
    const user = await getCurrentUser();
    const username = user.username;

    const key = `${username}/${this.selectedFile.name}`;
    console.log(key);
    try {
      const result = await Storage.uploadData({
        key:key, data: this.selectedFile, options: {
        contentType: this.selectedFile.type,
      }});
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }
  async fetchS3Files() {
    try {
      const username = this.user.username;
  
      const result = await list({
        path: `public/${username}/`
      });
  
      // Save file keys (names) to display in UI
      this.s3Files = result.items.map(item => item.path.split("/")[2]);  
    } catch (error) {
      console.error('Error fetching files from S3:', error);
    }
  }

  async ngOnInit() {
    this.user = await getCurrentUser();
    await this.fetchS3Files();
  }

  async handleSignOut() {
    try {
      await signOut();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  }
  async downloadFile(file: string) {
    try {
      const fileURL = await getUrl({
        path: `public/${this.user.username}/${file}`
      });
  
      const a = document.createElement('a');
      a.href = fileURL.url.toString(); 
      a.download = file;
      a.target = '_blank';
      a.click();
    } catch (error) {
      console.error('Error generating download URL:', error);
    }
  }
  

}

