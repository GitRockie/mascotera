import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/interface';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})

export class Tab3Page implements OnInit {

  users: Usuario[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe((res) => {
        this.users = res.map((t) => ({
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Usuario
        }));
    });
  }

  userList() {
    this.userService.getUsers()
    .subscribe((data) => {
      console.log(data);
    }) ;
  }

  remove(id) {
    console.log(id);
    if (confirm('Are you sure?')) {
      this.userService.delete(id);
    }
  }

}
