import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componentes } from 'src/app/models/interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  componentes: Observable<Componentes[]>

  constructor( private menuCtrl: MenuController,
    private dataService: DataService ) { }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpt();
  }

  showMenu() {
    this.menuCtrl.open('first');
  }

}
