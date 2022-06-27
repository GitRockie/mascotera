import { Component, Input, OnInit } from '@angular/core';
import { Mascota } from '../../models/interface';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;

  constructor() { }

  ngOnInit() {
    console.log( 'ID', this.id );
  }

}
