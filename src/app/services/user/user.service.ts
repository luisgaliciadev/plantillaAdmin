import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import {map} from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../uploadFile/upload-file.service';

// Others
// import swal from 'sweetalert';
import Swal from 'sweetalert2';





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
    public _router: Router,
    // tslint:disable-next-line: variable-name
    public _uploadFileService: UploadFileService
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

   // Login Normal
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

   // Añadir items al localStorage
   loadStorage() {
     if (localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.user = JSON.parse(localStorage.getItem('user'));
     } else {
      this.token = '';
      this.user = null;
     }
   }

   // Cerrar Sesion
   logout() {
    this.user = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');

    this._router.navigate(['/login']);

   }

   // Actualizar perfil de usuario
   updateProfile(user: User) {
    return this._http.put(this.URL + '/user/' + user._id + '?token=' + this.token, user)
    .pipe(map((res: any) => {

      if (user._id === this.user._id) {
        this.saveLocalStorage(res.user._id, this.token, res.user);
      }

      Swal.fire('Mensaje', 'Perfil Actualizado Correctamente', 'success');

      return true;

    }));
   }

   // Cambiar imagen de perfil de usuario
   changeImage(file: File, id: string) {
    this._uploadFileService.uploadFile(file, 'user', id)
        .then( (resp: any) => {
          this.user.image = resp.user.image;
          this.saveLocalStorage(id, this.token, this.user);
          Swal.fire('Mensaje', 'Imagen Actualizada Correctamente', 'success');
          //console.log(resp);
        })
        .catch( resp => {
          console.log(resp);
        });
   }

  // Metodo para listar usuarios
  getUsers(desde: number = 0) {

    return this._http.get(this.URL + '/user?desde=' + desde);

  }

  //  getUsers(desde: number = 1) {

  //   return this._http.get(this.URL + '/user/' + desde);

  //  }

  // Metodo para buscar usuario
  searchUser(termino: string) {
    // console.log(termino);
    return this._http.get(this.URL + '/search/collection/users/' + termino)
    .pipe(map((res: any) => {

      return res.users;

    }));
  }

  // Borar Usuario
  deleteUser(id: string) {
    return this._http.delete(this.URL + '/user/' + id + '?token=' + this.token);
  }

}
