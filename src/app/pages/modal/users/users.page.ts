import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { ModalController, } from '@ionic/angular';
import { Usuario, UserPhoto } from 'src/app/models/interface';
import { PhotoService } from 'src/app/services/photo.service';

@Component({
  selector: 'app-modal',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})

export class ModalPage implements OnInit {
  @Input() id: string;
  user: Usuario = null;
  photo: UserPhoto;
  pageText: string;
  constructor(private userService: UserService,
    private modalCtrl: ModalController,
    public photoService: PhotoService,
    ) { }

  ngOnInit() {
    this.userService.getUserById(this.id).subscribe(res => {
      this.user = res;
    });
  }

  async deleteUser() {
    this.pageText = 'Borrar Usuario';
    await this.userService.deleteUser(this.user);
    this.modalCtrl.dismiss();
  }

  async updateUser() {
    this.pageText = 'Actualizar Usuario';
    console.log('Update:',this.user);
    await this.userService.updateUser(this.user);
     try {
      this.modalCtrl.dismiss();
     }
     catch(error)
     {
      this.userService.presentToast('Usuario ACTUALIZADO');
     }

  }
}
