import { Injectable } from '@angular/core';
import { AngularFireDatabase, } from '@angular/fire/compat/database';
import { AngularFireStorage, } from '@angular/fire/compat/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/interface';

import { Camera, CameraResultType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

import { SafeResourceUrl } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';
import { ElementRef } from '@angular/core';
import { getDownloadURL, getStorage, ref } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  filePickerRef: ElementRef<HTMLInputElement>;
  photo: SafeResourceUrl;
  image: any;
  isDesktop: boolean;
  bucket = environment.firebase.storageBucket;
  private basePath = '/userimages/';

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  public async addNewPhoto() {
    if (!Capacitor.isPluginAvailable('Camera')) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    const image = await Camera.getPhoto({
      quality: 100,
      width: 400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
    }).then();
    return image;
  }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = this.basePath + fileUpload.file.name;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();
    return uploadTask.percentageChanges();
  }

  async getImages(filename: string) {
    const storage = getStorage();
    const spaceRef = ref(storage, this.basePath + filename);
    const path = getDownloadURL(spaceRef).then();
//    console.log('Path url:', (await path).toString());
    return (await path).toString();

  }

/*
  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch((error) => console.log(error));
  }
*/
  dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
/*
  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
*/
  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

}
