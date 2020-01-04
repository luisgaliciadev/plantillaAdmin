import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/service.index';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  public desde = 0;
  //public desde = 1;
  public totalRegistros = 0;
  public loading = true;

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    // tslint:disable-next-line: variable-name
    public _modalUploadServide: ModalUploadService
  ) { }

  ngOnInit() {
    this.loadUser();
    this._modalUploadServide.notificacion.subscribe(
      response => {
        this.loadUser();
      },
    );
  }

  // Listar usuarios
  loadUser() {
    this.loading = true;
    this._userService.getUsers(this.desde).subscribe(
      (response: any) => {
        // console.log(this.desde);
        this.totalRegistros = response.totalUsers;
        this.users = response.users;
        this.loading = false;
        // console.log( this.totalRegistros);
      }
    );
  }

  // Cambiar pagina de lista de usuarios
  changePage(valor: number) {
    // tslint:disable-next-line: prefer-const
    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.loadUser();

  }

  // Buscar Usuario
  searchUser(termino) {

    if (termino.length <= 0) {
      this.loadUser();
      return;
    } else {

      this.loading = true;
      this._userService.searchUser(termino).subscribe(
        response => {
          // console.log(response);
          this.users = response;
          this.loading = false;
        }
      );
    }
  }

  // Borar Usuario
  deleteUser(user: User) {

    if (user._id === this._userService.user._id) {
      Swal.fire('Mensaje', 'No Puedes Eliminar Este Usuario', 'error');
      return;
    } else {

      Swal.fire({
        title: 'Mensaje',
        text: '¿Seguro que desea Eliminar este Usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          //console.log(user);
          this._userService.deleteUser(user._id).subscribe(
            response => {
              console.log(response);
              this.loading = true;
              this.desde = 0;
              this.loadUser();
              this.loading = false;
              Swal.fire(
                'Mensaje',
                'Usuario Borrado Correctamente.',
                'success'
              );
            }
          );
        }
      });
    }
  }

  // Actualizar rol de usuario
  updateRole(user: User) {
    console.log(user);
    this._userService.updateProfile(user).subscribe(
      //response => {
        //this.loading = true;
       // this.loadUser();
        //this.loading = false;
        //console.log(response);
      //}
    );
  }

  // Mostrar Modal
  showModal(type: string, id: string, image: string, google: boolean) {
    this._modalUploadServide.showModal(type, id, image, google);
  }
}
