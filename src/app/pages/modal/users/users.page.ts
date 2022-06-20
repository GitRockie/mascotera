import { Component, ElementRef, ViewChild, Input, OnInit, } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { ModalController, } from '@ionic/angular';
import { Usuario, FileUpload } from 'src/app/models/interface';
import { PhotoService } from 'src/app/services/photo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Photo } from '@capacitor/camera';

@Component({
  selector: 'app-modal',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class ModalPage implements OnInit {

  @Input() id: string;
  @ViewChild('filePicker', { static: false })
  filePickerRef: ElementRef<HTMLInputElement>;
  public photo: SafeResourceUrl;
  isDesktop: boolean;
  user: Usuario ;
  pageText: string;
  image: Photo;



  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
    public photoService: PhotoService,
    public sanitizer: DomSanitizer,
    ) { }

  ngOnInit() {
    this.userService.getUserById(this.id).subscribe(res => {
      this.user = res;
      this.getImage(this.user.id );
    });
  }

  async deleteUser() {
    this.pageText = 'Borrar Usuario';
    this.userService.deleteUser(this.user);
    this.modalCtrl.dismiss();
  }
  async userPhoto()
  {
    const picture  =  await this.photoService.addNewPhoto();
    this.image = picture;
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
    picture.dataUrl &&  picture.dataUrl);
    return;
  }

  async getImage(filename: string)
  {
    filename += '.png';
    const picture = this.photoService.getImages(filename);
//    console.log('picture:', (await picture).toString());
    this.photo = (await picture).toString();
  }

  async updateUser() {
    this.pageText = 'Actualizar Usuario';
    if (typeof(this.photo) != 'string')
    {
      const filename =  this.user.id + '.png';
      const file = this.photoService.dataURLtoFile(this.image.dataUrl,filename);
      const fileUpload = new FileUpload(file);
      this.photoService.pushFileToStorage(fileUpload);
      this.user.photo = (await this.photoService.getImages(filename)).toString();
    }
  //  console.log('UsersPhoto:',this.user.photo);
    await this.userService.updateUser(this.user, this.user.photo);
     try {
      this.userService.presentToast('Usuario ACTUALIZADO');
      this.modalCtrl.dismiss();
     }
     catch(error)
     {
      this.userService.presentToast(error);
     }
  }
}
