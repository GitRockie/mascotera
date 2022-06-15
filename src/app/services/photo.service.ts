import { Injectable } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  Storage,
  uploadString,
  StorageReference,
  ListResult,
} from '@angular/fire/storage';
//import { Storage } from '@capacitor/storage';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
  AngularFireStorageModule,
} from '@angular/fire/compat/storage';
import { getBytes } from 'firebase/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  filePickerRef: ElementRef<HTMLInputElement>;
  photo: SafeResourceUrl;
  isDesktop: boolean;

  constructor(
    private platform: Platform,
    private sanitizer: DomSanitizer,
    //    private storage: AngularFireStorage,
    private storage: Storage
  ) {
    this.platform = platform;
  }
  public async addNewPhoto(name) {
    // Take a photo
    //    if (!Capacitor.isPluginAvailable('Camera') || (this.isDesktop && type === 'gallery')) {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePickerRef.nativeElement.click();
      return;
    }

    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      //      source: CameraSource.Prompt
    });
    console.log('Foto:', this.photo);
    this.uploadImage(image.dataUrl, name);
    return image;
  }

  uploadImage(image, name) {
    const filename = name + '.png';
    const storageRef = ref(this.storage, 'userimages/' + filename);
    const metadata = {
      contentType: 'image/jpeg',
      name: filename,
      msg: 'Msg',
    };
    //    const uploadTask = uploadBytesResumable(storageRef,image,metadata);
    const uploadResult = uploadString(
      storageRef,
      image,
      'data_url',
      metadata
    );
    console.log('Result:', uploadResult);
  }
  async getImageSaved(name) {
    const storage = getStorage();
    const filename = name + '.png';
    const storageRef = ref(this.storage, 'userimages/' + filename);
    //    const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/userimages/'+ filename);

    // Get the download URL
    const durl: Promise<string | void> = getDownloadURL(storageRef)
      .then((url) => url)
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            break;
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
    console.log('service:', durl.toString());
    return durl;
    /*
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
/*
        // This can be downloaded directly:
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
        const blob = xhr.response;
        };
        console.log('url:',url);
        xhr.open('GET', url);
        xhr.send();

        // Or inserted into an <img> element
        const img = document.getElementById(filename);
        img.setAttribute('src', url);
        console.log('url:',url.toString);
//        return url.toString;
      })
      .catch((error) => {
        console.log('Error:',error);
        return undefined;
      });
*/
  }

  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });
    console.log('Saved');
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
      photo,
    };
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
    console.log('ReadB64');
    return (await this.convertBlobToBase64(blob)) as string;
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      console.log('CBtoB64');
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });
}
