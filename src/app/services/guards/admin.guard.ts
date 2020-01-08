import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    // tslint:disable-next-line: variable-name
    public _router: Router
    ) {

  }
  canActivate() {

    if (this._userService.user.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log('Bloqueado por el AdminGuard.');
      this._userService.logout();
      // this._router.navigate(['/login']);
      return false;
    }
  }
}
