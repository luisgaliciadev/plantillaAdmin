import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  public URL: string;

  constructor(
    // tslint:disable-next-line: variable-name
    public _http: HttpClient,
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  ) {
    this.URL = URL_SERVICES;
  }

  // Listar Hospitales
  getHospitals(desde: number = 0) {
    return this._http.get(this.URL + '/hospital?desde=' + desde);
   // .pipe(map((res: any) => {

     // return res.hospitals;

   // }));
  }

  // Mostrar Hospital
  getHospital(id: string) {
    return this._http.get(this.URL + '/hospital/' + id);
  }

   // Listar todos Hospitales
   listHospitals() {
    return this._http.get(this.URL + '/hospital/gets');
   // .pipe(map((res: any) => {

     // return res.hospitals;

   // }));
  }

  // Borrar hospital
  deleteHospital(id: string) {
    return this._http.delete(this.URL + '/hospital/' + id + '?token=' + this._userService.token)
      .pipe(map((res: any) => {
        Swal.fire('Mensaje', 'Hospital Eliminado Correctamente', 'success');
        // return true;
      }));
  }

  // Registrar un hospital
  registerHospital(name: string) {
    return this._http.post(this.URL + '/hospital/?token=' + this._userService.token, {name})
      .pipe(map((res: any) => {
        Swal.fire('Mensaje', 'Hospital Registrado Correctamente', 'success');
        return res.hospital;
      }));
  }

  // Metodo para buscar hospital
  searchHospital(termino: string) {
    // console.log(termino);
    return this._http.get(this.URL + '/search/collection/hospitals/' + termino)
    .pipe(map((res: any) => {

      return res.hospitals;

    }));
  }

  // Actualizar datos de hospital
  updateHospital(hospital: Hospital) {
    return this._http.put(this.URL + '/hospital/' + hospital._id + '?token=' + this._userService.token, hospital)
    .pipe(map((res: any) => {


      Swal.fire('Mensaje', 'Hospital Actualizado Correctamente', 'success');

      return true;

    }));
   }

}
