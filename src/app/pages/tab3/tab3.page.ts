import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/interface';
import { UserService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})

export class Tab3Page implements OnInit {

  public userArray: Usuario;
  public userId: string;

  constructor(
    private userservice: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

    ngOnInit() {
      this.fetchUsers();
      const userId: string = this.route.snapshot.paramMap.get('id');
      console.log('Id:', userId);
      this.userservice.getUserDetail(userId).subscribe(userd => {
        this.userArray = userd as Usuario;
        console.log('User:',userd.name);
      });    }

  fetchUsers() {
    this.userservice.getUserList().subscribe((data) => {
      console.log(data);
    });
  }
/*
  fetchUser(){
    this.userservice.getUserList().valueChanges().subscribe(res => {
      console.log('Fetched users list!');
    });
 }
*/
}

