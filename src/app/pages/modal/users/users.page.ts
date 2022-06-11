import { Component, ElementRef, ViewChild, Input, OnInit, Sanitizer } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { ModalController, } from '@ionic/angular';
import { Usuario, UserPhoto } from 'src/app/models/interface';
import { PhotoService } from 'src/app/services/photo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-modal',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class ModalPage implements OnInit {

  @Input() id: string;
  @ViewChild('filePicker', { static: false })
  filePickerRef: ElementRef<HTMLInputElement>;
  photo: SafeResourceUrl;
  isDesktop: boolean;
  user: Usuario ;
  pageText: string;

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
    public photoService: PhotoService,
    public sanitizer: DomSanitizer,
    ) { }

  ngOnInit() {
    this.userService.getUserById(this.id).subscribe(res => {
      this.user = res;
    });
  }

  async deleteUser() {
    this.pageText = 'Borrar Usuario';
    await this.userService.deleteUser(this.user);
    this.userService.presentToast('Usuario ELIMINADO');
    this.modalCtrl.dismiss();
  }

  async userPhoto(){
    const picture = this.photoService.addNewPhoto();
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
      picture && (await picture).dataUrl);
    console.log('Photo', this.photo);
    return ;
  }

  async updateUser() {
    this.pageText = 'Actualizar Usuario';
    console.log('Update:',this.user);
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
