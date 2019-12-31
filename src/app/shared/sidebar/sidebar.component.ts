import { Component, OnInit } from '@angular/core';
import { SidebarService, UserService } from '../../services/service.index';
import { User } from 'src/app/models/user.model';

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
    public _userService: UserService
    ) { }

  ngOnInit() {
    this.user = this._userService.user;
  }

}
