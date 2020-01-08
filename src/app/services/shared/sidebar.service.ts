import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[];

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  )
  // tslint:disable-next-line: one-line
  {
    
  //   this.menu = [{
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Dashboard', url: '/dashboard'},
  //       { titulo: 'PogressBar', url: '/progress'},
  //       { titulo: 'Graficas', url: '/graphics1'},
  //       { titulo: 'Promesas', url: '/promesas'}
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       {titulo: 'Usuarios', url: '/users'},
  //       {titulo: 'Hopitales', url: '/hospitals'},
  //       {titulo: 'Medicos', url: '/doctors'}
  //     ]
  //   }
  //   ];
  // }
  }

  loadMenu() {
    this.menu = this._userService.menu;
  }
}
