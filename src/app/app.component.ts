import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componentes } from './models/interface';
import { AuthenticationService } from './services/authentication.service';
import { DataService } from './services/data.service';
import { IonToggle } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  items: Observable<any[]>;
  componentes: Observable<Componentes[]>;
  toggle: Element;
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  checkToggle: any;


  constructor(firestore: AngularFirestore,
              private dataService: DataService,
              private menuCtrl: MenuController,
              private route: Router,
              private auth: AuthenticationService, )
              {
    this.items = firestore.collection('items').valueChanges();
  }

  ngOnInit() {
    this.componentes = this.dataService.getMenuOpt();
  }

  showMenu() {
    this.menuCtrl.open('first');
  }

  logout() {
    this.auth.logout().then(() => {
      this.menuCtrl.close('first');
      this.route.navigate(['/login', {replaceUrl: true}]);
    });
  }

  setModeToggle() {
    document.body.classList.toggle('dark', this.prefersDark.matches);
    this.toggle = document.querySelector('#themeToggle');
//    this.toggle.addEventListener('ionChange', (e) => document.body.classList.toggle('dark', e.detail.checked));
    this.prefersDark.addEventListener('change', (e) => this.checkToggle(e.matches));
  }


}
