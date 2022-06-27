import { Component, OnInit } from '@angular/core';
import { Mascota } from '../../models/interface';
import { DataService } from '../../services/data.service';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from 'src/app/components/detalle/detalle.component';

@Component({
  selector: 'app-home',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})

export class Tab2Page implements OnInit {
  mascota: Mascota;
  mascotaArray = [];
  constructor( private modalCtrl: ModalController,
               private dataService: DataService
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

  async mostrarDetalles( id: string ){
    
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    
    });
    
    modal.present();
  }

  
}
