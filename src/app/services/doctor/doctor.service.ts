import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { Doctor } from '../../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  public URL: string;

  constructor(
    // tslint:disable-next-line: variable-name
    public _http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  ) {
    this.URL = URL_SERVICES;
  }

  // Metodo para listar medicos
  getDoctors(desde: number = 0) {

    return this._http.get(this.URL + '/doctor?desde=' + desde);

  }

  // Metodo para consultar un medico
  getDoctor(id) {

    return this._http.get(this.URL + '/doctor/' + id);

  }


  // Metodo para buscar medicos
  searchDoctor(termino: string) {
    // console.log(termino);
    return this._http.get(this.URL + '/search/collection/doctors/' + termino)
    .pipe(map((res: any) => {

      return res.doctors;

    }));
  }

  // Registrar un medico
  registerDoctor(doctor: Doctor) {

    if (doctor._id) {
      // Actualizar Medico
      return this._http.put(this.URL + '/doctor/' + doctor._id + '?token=' + this._userService.token, doctor)
      .pipe(map((res: any) => {
        Swal.fire('Mensaje', 'Medico Actualizado Correctamente', 'success');
        return res.doctor;
      }));
    } else {
      // Registrar Medico
      return this._http.post(this.URL + '/doctor/?token=' + this._userService.token, doctor)
      .pipe(map((res: any) => {
        Swal.fire('Mensaje', 'Medico Registrado Correctamente', 'success');
        return res.doctor;
      }));
    }

  }


 // Borrar doctor
 deleteDoctor(id: string) {
  return this._http.delete(this.URL + '/doctor/' + id + '?token=' + this._userService.token)
    .pipe(map((res: any) => {
      Swal.fire('Mensaje', 'Medico Eliminado Correctamente', 'success');
      return true;
    }));
}




}
