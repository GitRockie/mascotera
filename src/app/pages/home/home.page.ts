import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MenuOpt } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  menuOptions: Observable<MenuOpt[]>

  constructor( private dataService: DataService,
               private menuCtrl: MenuController ) { 
    this.dataService.getUsers()
      .subscribe(res =>{
        console.log( res );
    })
  }

  ngOnInit() {
    this.menuOptions = this.dataService.getMenuOpt();
  }

  showMenu() {
    this.menuCtrl.open('first');
  }

}
