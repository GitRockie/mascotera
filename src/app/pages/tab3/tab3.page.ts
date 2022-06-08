import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Usuario, UserPhoto, } from 'src/app/models/interface';
import { UserService } from '../../services/users.service';
import { PhotoService } from 'src/app/services/photo.service';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { UsersPage } from '../modal/users/users.page';

@Component({
  selector: 'app-todo-list',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})

export class Tab3Page implements OnInit {

  user: Usuario[] = [];

  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private modalCtrl: ModalController,
    public photoService: PhotoService, ) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(res => {
      this.user = res;
      this.cd.detectChanges();
    });
}
  async openUser(user: Usuario) {
    const modal = await this.modalCtrl.create({
      component: UsersPage,
      componentProps: { id: user.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }

  userList() {
    this.userService.getUsers()
    .subscribe((data) => {
      console.log(data);
    }) ;
  }

  async deleteUser(user: Usuario) {
    await this.userService.deleteUser(user);
  }

}
