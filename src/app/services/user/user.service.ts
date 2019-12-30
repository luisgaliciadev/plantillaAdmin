import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import {map} from 'rxjs/operators';

// Others
// import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public URL: string;
  public user: User;
  public token: string;

  constructor(
    // tslint:disable-next-line: variable-name
    public _http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _router: Router
  ) {
    this.URL = URL_SERVICES;
    this.loadStorage();
   }

   // Registrar un Usuario
   userRegister(user: User) {
    return this._http.post(this.URL + '/user', user)
      .pipe(map((res: any) => {

        Swal.fire('Mensaje', 'Usuario Registrado Correctamente', 'success');
        return res.user;

      }));
   }

   // Login
   login(user: User, remenberme: boolean = false) {

    if (remenberme) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }

    return this._http.post(this.URL + '/login', user)
      .pipe(map((res: any) => {

        // localStorage.setItem('id', res.id);
        // localStorage.setItem('token', res.token);
        // localStorage.setItem('user', JSON.stringify(res.user));

        this.saveLocalStorage(res.id, res.token, res.user);

        return true;
      }));
   }

   // Login Google
   loginGoogle(token) {

    return this._http.post(this.URL + '/login/google', {token})
    .pipe(map((res: any) => {

      this.saveLocalStorage(res.id, res.token, res.user);
      return true;

    }));

   }

   saveLocalStorage(id: string, token: string, user: User) {
      localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      this.user = user;
      this.token = token;
   }

   isLoged() {
     return (this.token.length > 5) ? true : false;
   }

   loadStorage() {
     if (localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.user = JSON.parse(localStorage.getItem('user'));
     } else {
      this.token = '';
      this.user = null;
     }
   }

   logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');

    this._router.navigate(['/login']);

   }
}
