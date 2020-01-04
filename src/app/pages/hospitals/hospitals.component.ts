import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styles: []
})
export class HospitalsComponent implements OnInit {

  public loading: boolean;
  public totalRegistros: number;
  public desde = 0;
  public hospitals: Hospital;

  constructor(
    // tslint:disable-next-line: variable-name
    public _hospitalService: HospitalService,
    // tslint:disable-next-line: variable-name
    public _modalUploadServide: ModalUploadService
  ) {

    this.loading = false;
    this.totalRegistros = 0;

  }

  ngOnInit() {
    this.getHospitals();
    this._modalUploadServide.notificacion.subscribe(
      response => {
        this.getHospitals();
      },
    );
  }

  getHospitals() {
    this._hospitalService.getHospitals(this.desde).subscribe(
      (response: any) => {
        // console.log(response);
        this.hospitals = response.hospitals;
        this.totalRegistros = response.totalHospitals;
      }
    );
  }

  // Registrar Hospital
  async registerHospital() {

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
          this._hospitalService.registerHospital(value).subscribe(
            response => {
              this.getHospitals();
              // console.log(response);
            },
          );
        }
      }
    });
    // console.log(value);
  }

  // Actualizar Hospital
  updateHospital(hospital: Hospital) {
    // console.log(hospital);
    this._hospitalService.updateHospital(hospital).subscribe(
      response => {
        // console.log(response);
        this.getHospitals();
      },
    );
  }

  // Cambiar pagina de lista de hospitales
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
    this.getHospitals();
  }

  // Buscar Hopistales
   searchHospital(termino) {

    if (termino.length <= 0) {
      this.getHospitals();
      return;
    } else {

      this.loading = true;
      this._hospitalService.searchHospital(termino).subscribe(
        response => {
          // console.log(response);
          this.hospitals = response;
          this.loading = false;
        }
      );
    }
  }

  // Borar Hospital
  deleteHospital(hospital: Hospital) {

      Swal.fire({
        title: 'Mensaje',
        text: '¿Seguro que desea Eliminar este Hospital?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          //console.log(user);
          this._hospitalService.deleteHospital(hospital._id).subscribe(
            response => {
              console.log(response);
              this.loading = true;
              this.desde = 0;
              this.getHospitals();
              this.loading = false;
              Swal.fire(
                'Mensaje',
                'Hospital Eliminado Correctamente.',
                'success'
              );
            }
          );
        }
      });
  }

  // Mostrar Modal
  showModal(type: string, id: string, image: string, google: boolean) {
    this._modalUploadServide.showModal(type, id, image, google);
  }

}
