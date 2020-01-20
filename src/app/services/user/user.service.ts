import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.model';
import { URL_SERVICES } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UploadFileService } from '../uploadFile/upload-file.service';

// Others
// import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public URL: string;
  public user: User;
  public token: string;
  public menu: any = [];
  public menus: any = [];
  public idRole: number;
  public modules: any = [];

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

   // Renovar token
   renewToken() {
     return this._http.get(this.URL + '/login/renewtoken?token=' + this.token)
               .pipe(map( (res: any) => {

                  this.token = res.token;
                  localStorage.setItem('token', this.token);
                  console.log('Token renew');
                  return true;

                }))

                .pipe(catchError( (err: any) => {
                  // const message = err.error.message;
                  Swal.fire('Mensaje', 'No se puedo renovar el Token de Seguridad', 'error');
                  return throwError(err);

                }));
   }
   // Registrar un Usuario
   userRegister(user: User) {
    // console.log(user);
    return this._http.post(this.URL + '/user', user)
      .pipe(map((res: any) => {
        Swal.fire('Mensaje', 'Usuario Registrado Correctamente', 'success');
        return res.user;
      }))
      .pipe(catchError( (err: any) => {
        // console.log(err);

        if (err.status === 400) {
          Swal.fire('Mensaje', err.error.message, 'error');
        } else {
          Swal.fire('Mensaje', 'No se pudo realizar el registro', 'error');
          return throwError(err);
        }
      }));
   }

   // Login Normal
   login(user: User, remenberme: boolean = false) {

    // console.log(user);

    if (remenberme) {
      localStorage.setItem('email', user.EMAIL);
    } else {
      localStorage.removeItem('email');
    }

    return this._http.post(this.URL + '/login', user)
      .pipe(map( (res: any) => {
        // console.log(res);

        this.saveLocalStorage(res.id, res.token, res.user, res.menu);
        return true;
      }))
      .pipe(catchError( (err: any) => {

        const message = err.error.message;
        Swal.fire('Mensaje', message, 'error');
        return throwError(err);
      }));

   }

   // Login Google
   loginGoogle(token: string) {
    // console.log(token);
    return this._http.post(this.URL + '/login/google', { token })
    .pipe(map((res: any) => {

      // console.log(res.user);
      this.saveLocalStorage(res.id, res.token, res.user, res.menu);
      return true;

    }));

   }

   // Gets modules
    getModules(idRole) {

    return this._http.get(this.URL + '/user/modules/' + idRole)
      .pipe(map((res: any) => {
      this.modules = res;
      // console.log(this.modules);
      // console.log(res.user);
      // this.saveLocalStorage(res.ID_USER, res.token, res.user, res.menu);
      return this.modules;
      }));
    }

    // Gets menu
    getMenu(idRole) {

      return this._http.get(this.URL + '/user/menu/' + idRole)
        .pipe(map((res: any) => {
        this.menus = res;
        // console.log(this.modules);
        // console.log(res.user);
        // this.saveLocalStorage(res.ID_USER, res.token, res.user, res.menu);
        return this.menus;
        }));
      }

   saveLocalStorage(id: number, token: string, user: User, menu: any) {
      localStorage.setItem('id', id.toString());
      // localStorage.setItem('idRole', user.ID_ROLE.toString());
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('menu', JSON.stringify(menu));

      this.user = user;
      this.token = token;
      this.menu = menu;
      // console.log(this.menu);
      // this.idRole = user.ID_ROLE;
      // console.log(this.idRole);
   }

   isLoged() {
     // console.log(this.token);
     return (this.token.length > 5) ? true : false;
   }

   // Añadir items al localStorage
   loadStorage() {
     if (localStorage.getItem('token')) {
       this.token = localStorage.getItem('token');
       this.user = JSON.parse(localStorage.getItem('user'));
       this.menu = JSON.parse(localStorage.getItem('menu'));
       // tslint:disable-next-line: radix
       this.idRole = parseInt(localStorage.getItem('idRole'));
     } else {
      this.token = '';
      this.user = null;
      this.menu = [];
      this.idRole = 0;
     }
   }

   // Cerrar Sesion
   logout() {
    this.user = null;
    this.token = '';
    this.menu = [];
    this.idRole = 0;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    localStorage.removeItem('menu');
    localStorage.removeItem('idRole');

    this._router.navigate(['/login']);

   }

   // Actualizar perfil de usuario
   updateProfile(user: User) {

    // tslint:disable-next-line: prefer-const
    let json = JSON.stringify(user);
     // tslint:disable-next-line: prefer-const
    let params = json;
    // console.log('parametros:' + params);
     // tslint:disable-next-line: prefer-const
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': this.token});
    // console.log(headers);

    return this._http.put(this.URL + '/user/' + user.ID_USER, params, {headers})

    .pipe(map((res: any) => {
      // console.log(res);
      if (user.ID_USER === this.user.ID_USER) {
        this.saveLocalStorage(res.user.ID_USER, this.token, res.user, this.menu);
      }

      Swal.fire('Mensaje', 'Perfil Actualizado Correctamente', 'success');

      return true;

    }))
    .pipe(catchError( (err: any) => {
      // console.log(err.error.message);
      if (err.status === 400) {
        Swal.fire('Mensaje', err.error.message, 'error');
      } else {
        Swal.fire('Mensaje', 'No se Pudo Actualizar el Perfil', 'error');
        return throwError(err);
      }
    }));
   }

   // Cambiar imagen de perfil de usuario
   changeImage(file: File, id: number) {
    this._uploadFileService.uploadFile(file, 'user', id)
        .then( (resp: any) => {
          // console.log(resp);
          this.user.IMAGE = resp.user.IMAGE;
          this.saveLocalStorage(id, this.token, this.user, this.menu);
          Swal.fire('Mensaje', 'Imagen Actualizada Correctamente', 'success');
          // console.log(resp);
        })
        .catch( resp => {
          // console.log(resp);
          Swal.fire('Error', 'No se pudo subir la imagen', 'warning');
        });
   }

    // Cambiar imagen de perfil de usuario
    changeImageCompany(file: File, id: number) {
      this._uploadFileService.uploadFile(file, 'company', id)
          .then( (resp: any) => {
            // console.log(resp);
            // this.user.IMAGE = resp.user.IMAGE;
            // this.saveLocalStorage(id, this.token, this.user, this.menu);
            Swal.fire('Mensaje', 'Imagen Actualizada Correctamente', 'success');
            // console.log(resp);
          })
          .catch( resp => {
            // console.log(resp);
            Swal.fire('Error', 'No se pudo subir la imagen', 'warning');
          });
     }

  // Metodo para listar usuarios
  getUsers(desde: number = 0) {

    return this._http.get(this.URL + '/user?desde=' + desde);

  }

  // Metodo para listar empresas
  getCompanys(ID_USER) {

    return this._http.get(this.URL + '/user/companys/' + ID_USER)
    .pipe(map((res: any) => {

      // console.log(res);
      return res;

    }));

  }

   // Metodo para buscar una empresa
   getCompany(ID_EMPRE_USER) {

    return this._http.get(this.URL + '/user/company/' + ID_EMPRE_USER)
    .pipe(map((res: any) => {

      if (res.company) {
        return res;
      } else {
        Swal.fire('Mensaje', 'Empresa no Registrada.', 'warning');
        return 0;
      }


    }));

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
  deleteUser(id: number) {
    return this._http.delete(this.URL + '/user/' + id + '?token=' + this.token);
  }

}
