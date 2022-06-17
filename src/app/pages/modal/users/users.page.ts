import { Component, ElementRef, ViewChild, Input, OnInit, Sanitizer } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { ModalController, } from '@ionic/angular';
import { Usuario, FileUpload } from 'src/app/models/interface';
import { PhotoService } from 'src/app/services/photo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Photo } from '@capacitor/camera';
import { url } from 'inspector';
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
  dwnURL: any;

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
    public photoService: PhotoService,
    public sanitizer: DomSanitizer,
    ) { }

  ngOnInit() {
    this.userService.getUserById(this.id).subscribe(res => {
      this.user = res;
      console.log('Nombre',res.nombre);
      this.getUrl(this.user.id);
    });

  }

  async deleteUser() {
    this.pageText = 'Borrar Usuario';
    this.userService.deleteUser(this.user);
    this.userService.presentToast('Usuario ELIMINADO');
    this.modalCtrl.dismiss();
  }
  async userPhoto()
  {
    const filename = this.user.id + '.png';
    const picture  =  await this.photoService.addNewPhoto(filename);
    this.image = picture;
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
    picture.dataUrl); // &&  picture.dataUrl);
//    this.photo = picture;
    console.log('Photo', this.photo);
    return ;
  }

  async getUrl(name)
  {
    this.photoService.getImages(name)
    if (this.image !== undefined)
    {
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.image && ( await this.image).dataUrl);
      console.log('photo', this.photo);
    }
    console.log('getImage:',this.image);
  }

  async updateUser() {
    this.pageText = 'Actualizar Usuario';
    const filename = 'userimages/' + this.user.id + '.png';
    const file = this.photoService.dataURLtoFile(this.image.dataUrl,filename);
    const fileUpload = new FileUpload(file);
    this.photoService.pushFileToStorage(fileUpload);
    this.user.photo = file.name;
    console.log('UsersPhoto:',this.user.photo);
    await this.userService.updateUser(this.user);
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
