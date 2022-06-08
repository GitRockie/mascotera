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
export class UsersPage implements OnInit {
  @Input() id: string;
  user: Usuario = null;
  photo: UserPhoto;
  actionButtonText: string;
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
    this.actionButtonText = 'Delete';
    await this.userService.deleteUser(this.user);
    this.modalCtrl.dismiss();
  }

  async updateUser() {
    this.actionButtonText = 'Update';
    await this.userService.updateUser(this.user);
/*
    const toast = await this.toastCtrl.create({
      message: 'Usuario ACTUALIZADO',
      duration: 2000
    });
*/
    this.userService.presentToast('Usuario ACTUALIZADO');
  }
}
