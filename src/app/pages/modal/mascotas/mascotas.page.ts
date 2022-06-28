import { Component, ElementRef, ViewChild, Input, OnInit, } from '@angular/core';
import { DataService} from '../../../services/data.service';
import { ModalController, } from '@ionic/angular';
import { Mascota, FileUpload } from 'src/app/models/interface';
import { PhotoService } from 'src/app/services/photo.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Photo } from '@capacitor/camera';
import { UserService } from 'src/app/services/users.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-modal',
  templateUrl: './mascotas.page.html',
  styleUrls: ['./mascotas.page.scss'],
})

export class MascotasPage implements OnInit {

  @Input() id: string;
  @ViewChild('filePicker', { static: false })
  filePickerRef: ElementRef<HTMLInputElement>;
  public photo: SafeResourceUrl;
  isDesktop: boolean;
  mascota: any;
  pageText: string;
  image: Photo;



  constructor(
    private dataService: DataService,
    public photoService: PhotoService,
    public sanitizer: DomSanitizer,
    public userService: UserService,
    public modalMCtrl: ModalController,
    ) { }
/*
  ngOnInit() {
    this.mascota = this.dataService.getMascota(this.mascota.id);
    console.log('Id',this.mascota.id);
    this.getImage(this.mascota.id );
  }
*/
  ngOnInit() {
    this.mascota = this.dataService.getMascota(this.id).snapshotChanges();
  }

  async deletemascota() {
    this.pageText = 'Borrar Mascota';
    this.dataService.deleteMascota(this.mascota.id);

  }

  async mascotaPhoto()
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

  async updatemascota() {
    this.pageText = 'Actualizar Mascota';
    if (typeof(this.photo) != 'string')
    {
      const filename =  this.mascota.id + '.png';
      const file = this.photoService.dataURLtoFile(this.image.dataUrl,filename);
      const fileUpload = new FileUpload(file);
      this.photoService.pushFileToStorage(fileUpload);
      this.mascota.photo = (await this.photoService.getImages(filename)).toString();
      this.modalMCtrl.dismiss();
    }
//    this.dataService.createMascota(this.formEntrada.value).then(res => {
//      this.formEntrada.reset();
//      this.router.navigate(['/tabs']);
//      this.salir();
//    })
//      .catch(error => console.log(error));

  //  console.log('mascotasPhoto:',this.mascota.photo);

    await this.dataService.updateMascota(this.id, this.mascota);
     try {
      this.userService.presentToast('Mascota ACTUALIZADA');
      this.modalMCtrl.dismiss();
     }
     catch(error)
     {
      this.userService.presentToast(error);
     }

  }
  salir(){
    this.modalMCtrl.dismiss();
  }
}
