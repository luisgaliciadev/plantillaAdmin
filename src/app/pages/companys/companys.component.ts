import { Component, OnInit } from '@angular/core';
import { CompanyUser } from 'src/app/models/companyUser.model';
import { UserService } from 'src/app/services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styles: []
})
export class CompanysComponent implements OnInit {

  public companyUser: CompanyUser[] = [];
  public desde = 0;
  public loading = true;
  public totalRegistros = 0;
  public ID_USER: number;

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    // tslint:disable-next-line: variable-name
    public _modalUploadService: ModalUploadService
  ) {
      this.ID_USER = this._userService.user.ID_USER;
  }

  ngOnInit() {
    this.loadCompany();
    this._modalUploadService.notificacion.subscribe(
      response => {
        this.loadCompany();
      },
    );
  }

  // Listar usuarios
  loadCompany() {
    this.loading = true;
    this._userService.getCompanys(this.ID_USER).subscribe(
      (response: any) => {
        // console.log(response);
        this.companyUser = response.companys;
        // console.log(this.companyUser);
        this.totalRegistros = response.companys.length;
        // console.log(this.totalRegistros);
        this.loading = false;
      }
    );
  }



  // Registrar Hospital
  async registerCompany() {

    const { value} = await Swal.fire({
      title: 'Registrar Hospital',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputPlaceholder: 'Nombre del Hospital',
      // tslint:disable-next-line: no-shadowed-variable
      inputValidator: (value) => {
        if (!value) {
          return 'Debe Ingresar el Nombre del Hospital';
        } else {
          // this._hospitalService.registerHospital(value).subscribe(
          //   response => {
          //     this.getHospitals();
          //     // console.log(response);
          //   },
          // );
        }
      }
    });
    // console.log(value);
  }


  // Cambiar pagina de lista de usuarios
  changePage(valor: number) {
    // // tslint:disable-next-line: prefer-const
    // let desde = this.desde + valor;
    // console.log(desde);

    // if (desde >= this.totalRegistros) {
    //   return;
    // }

    // if (desde < 0) {
    //   return;
    // }

    // this.desde += valor;
    // this.loadUser();

  }

  // Mostrar Modal
  showModal(type: string, id: number, image: string, google: boolean) {
    // console.log(google);
    this._modalUploadService.showModal(type, id, image, google);
  }


}
