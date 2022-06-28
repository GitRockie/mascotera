import { Component, OnInit,  ChangeDetectorRef, } from '@angular/core';
import { Mascota } from '../../models/interface';
import { DataService } from '../../services/data.service';
import { PhotoService } from 'src/app/services/photo.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MascotasPage } from '../modal/mascotas/mascotas.page';

@Component({
  selector: 'app-home',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

export class Tab2Page implements OnInit {
  mascotaArray = [];
  mascota: Mascota;
  photo ;
  id ;

  constructor(
    private dataService: DataService,
    private modalMCtrl: ModalController,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) { }

  ngOnInit() {
    this.fetchMascota();
    const mascotaRes = this.dataService.getMascotaList();
    mascotaRes.snapshotChanges().subscribe(res => {
      this.mascotaArray = [];
      res.forEach(item => {
        const a = item.payload.toJSON();
        // eslint-disable-next-line @typescript-eslint/dot-notation
        a['$key'] = item.key;
        this.mascotaArray.push(a as Mascota);
      });
    });
  }

  fetchMascota() {
    this.dataService.getMascotaList().valueChanges().subscribe(res => {
      console.log('Fetched mascota list!');
    });
  }
  async openMascota(mascota: Mascota) {
    const modal = await this.modalMCtrl.create({
      component: MascotasPage,
      componentProps: { id: mascota.id },
//      breakpoints: [0, 0.5, 0.8],
//      initialBreakpoint: 0.8
    });

    await modal.present();
  }

  deleteMascota(mascota){};

}
