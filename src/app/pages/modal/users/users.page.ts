import { Component, ElementRef, ViewChild, Input, OnInit, Sanitizer } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { ModalController, } from '@ionic/angular';
import { Usuario, UserPhoto } from 'src/app/models/interface';
import { PhotoService } from 'src/app/services/photo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
  image: any;
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
      this.getImage(this.user.id);
    });

  }

  async deleteUser() {
    this.pageText = 'Borrar Usuario';
    this.userService.deleteUser(this.user);
    this.userService.presentToast('Usuario ELIMINADO');
    this.modalCtrl.dismiss();
  }
  async userPhoto(){
    const picture =  this.photoService.addNewPhoto(this.user.id);
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      picture && (await picture).dataUrl);
    console.log('Photo', this.photo);
    return ;
  }

  async getImage(name: string)
  {
    this.image = this.photoService.getImageSaved(name);
    if (this.image !== undefined)
    {
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.image && ( await this.image).dataUrl);
//      this.photo = this.image.dataUrl;
      console.log('photo', this.photo);
    }
    console.log('getImage:',this.image);
  }

  async updateUser() {
    this.pageText = 'Actualizar Usuario';
    const file = this.user.id;
//    const itemurl =  this.photoService.getStoredImage(this.user.id);
//    this.user.photo = this.getImage(this.user.id);
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
