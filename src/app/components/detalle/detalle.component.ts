import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Mascota } from '../../models/interface';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  favourite: boolean = false;

  constructor( private modalCtrl: ModalController) { }

  ngOnInit() {
    
  }

  closeNoArguments() {
    this.modalCtrl.dismiss();
  }

  
  onClick() {
    this.favourite = !this.favourite;
  }

  

}
