import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { DoctorService } from '../../services/service.index';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styles: []
})
export class DoctorsComponent implements OnInit {

  public loading: boolean;
  public totalRegistros: number;
  public doctors: Doctor;
  public desde = 0;

  constructor(
    // tslint:disable-next-line: variable-name
    public _doctorService: DoctorService,
    // tslint:disable-next-line: variable-name
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.getDoctors();
    this._modalUploadService.notificacion.subscribe(
      response => {
        this.getDoctors();
      },
    );
  }

  // Listar medicos
  getDoctors() {
    this._doctorService.getDoctors(this.desde).subscribe(
      (response: any) => {
       // console.log(response);
        this.doctors = response.doctors;
        this.totalRegistros = response.totalDoctors;
      }
    );
  }

  // Registrar doctor
  registerDoctor() {

  }

  // Actualizar Doctor
  updateDoctor() {

  }

  // Borrar Doctor
  deleteDoctor(id: string) {
    this._doctorService.deleteDoctor(id).subscribe(
      (response) => {
        console.log(response);
        this.desde = 0;
        this.getDoctors();
      }
    );
  }

  // Buscar Medicos
  searchDoctor(termino) {

    if (termino.length <= 0) {
      this.getDoctors();
      return;
    } else {

      this.loading = true;
      this._doctorService.searchDoctor(termino).subscribe(
        response => {
          // console.log(response);
          this.doctors = response;
          this.loading = false;
        }
      );
    }
  }

  // Mostrar Modal
  showModal(type: string, id: string, image: string, google: boolean) {
    this._modalUploadService.showModal(type, id, image, google);
  }



  // Cambiar de pagina
  changePage(valor) {
    // tslint:disable-next-line: prefer-const
    let desde = this.desde + valor;
    // console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.getDoctors();
  }

}
