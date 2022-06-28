import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componentes } from './models/interface';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  items: Observable<any[]>;
  componentes: Observable<Componentes[]>

  constructor(firestore: AngularFirestore,
              private dataService: DataService,
              private menuCtrl: MenuController ) {
    this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpt();
  }

  showMenu() {
    this.menuCtrl.open('first');
  }

}
