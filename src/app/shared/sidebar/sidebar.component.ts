import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { User } from 'src/app/models/user.model';

// declare function init_plugins();

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})



export class SidebarComponent implements OnInit {

  public user: User;

  constructor(
    // tslint:disable-next-line: variable-name
    public _sidebar: SidebarService,
    // tslint:disable-next-line: variable-name
    public _userService: UserService
    ) {

     }

  ngOnInit() {
    // console.log('sidebar componente');
    // init_plugins();
    this.user = this._userService.user;
    this._sidebar.loadMenu();
  }


}
