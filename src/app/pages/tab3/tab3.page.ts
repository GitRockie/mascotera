import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Usuario, UserPhoto, } from 'src/app/models/interface';
import { UserService } from '../../services/users.service';
import { PhotoService } from 'src/app/services/photo.service';
import { IonList, ModalController } from '@ionic/angular';
import { ModalPage, } from '../modal/users/users.page';

@Component({
  selector: 'app-todo-list',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})

export class Tab3Page implements OnInit {
  @ViewChild(IonList) ionList: IonList;
  user: Usuario[] = [];
  photo ;
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
      component: ModalPage,
      componentProps: { id: user.id },
//      breakpoints: [0, 0.5, 0.8],
//      initialBreakpoint: 0.8
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
    this.ionList.closeSlidingItems();
  }
  async getImage(filename: string)
  {
    filename += '.png';
    const picture = this.photoService.getImages(filename);
    console.log('picture:', (await picture).toString());
    this.photo = (await picture).toString();
  }

  favorite(user: any) {
    console.log(user);
    this.ionList.closeSlidingItems();
  }

  share(user: any) {
    console.log(user);
    this.ionList.closeSlidingItems();
  }
}
