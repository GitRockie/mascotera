import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componentes } from 'src/app/models/interface';
import { DataService } from 'src/app/services/data.service';

import SwiperCore, { Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectFade, EffectCube, EffectFlip, EffectCreative, EffectCards, EffectCoverflow  } from 'swiper';
import { IonicSlides } from '@ionic/angular';

SwiperCore.use([Autoplay, Keyboard, Pagination, Scrollbar, Zoom, EffectFade, IonicSlides, EffectCube, EffectFlip, EffectCreative, EffectCards, EffectCoverflow]);


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  componentes: Observable<Componentes[]>
  textSearch: string = '';
  

  constructor( private menuCtrl: MenuController,
    private dataService: DataService ) { }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpt();
  }

  showMenu() {
    this.menuCtrl.open('first');
  }

  onSearchChange( event: any ) {
    this.textSearch = event.detail.value;
  }
  



}
