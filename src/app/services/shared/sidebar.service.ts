import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[];

  constructor()
  {
    this.menu = [{
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard'},
        { titulo: 'PogressBar', url: '/progress'},
        { titulo: 'Graficas', url: '/graphics1'}
      ]
    }];
   }
}
