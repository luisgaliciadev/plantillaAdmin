import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from '../../services/service.index';
import { DoctorService } from '../../services/service.index';
import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: []
})
export class DoctorComponent implements OnInit {

  public doctor: Doctor = new Doctor('', '' ,'' ,'');
  public hospitals: Hospital;
  public hospital: Hospital;
  public isEdit: string;

  constructor(
    // tslint:disable-next-line: variable-name
    public _hospitalService: HospitalService,
    // tslint:disable-next-line: variable-name
    public _doctorService: DoctorService,
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    // tslint:disable-next-line: variable-name
    public _router: Router,
    // tslint:disable-next-line: variable-name
    public _activateRoute: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    public _modalUploadService: ModalUploadService
  ) {

    this.hospital = new Hospital('', '', '');
    this.isEdit = this.doctor._id;
    this._activateRoute.params.subscribe(params => {
      // tslint:disable-next-line: prefer-const
      let id = params.id;
      //console.log(params.id);
      if ( id !== 'nuevo') {
        this.getDoctor(id);

        this._modalUploadService.notificacion.subscribe(
          response => {
            this.doctor.image = response.doctor.image;
          },
        );

      }
    });
  }

  ngOnInit() {
    this.getHospitals();
  }

  save(form) {

    this._doctorService.registerDoctor(this.doctor).subscribe(
      response => {
        // console.log(response);
        this.doctor._id = response._id;
        this._router.navigate(['/doctor', response._id ]);
      }
    );
  }

  // Lista Hospitales
  getHospitals() {
    this._hospitalService.listHospitals().subscribe(
      (response: any) => {
        this.hospitals = response.hospitals;
        // console.log(this.hospitals);
      }
    );

  }


  // Buscar un doctor
  getDoctor(id: string) {
    // console.log(id);
    this._doctorService.getDoctor(id).subscribe(
      (response: any) => {
        this.doctor = response.doctor;
        this.doctor.user = response.doctor.user._id;
        this.doctor.hospital = response.doctor.hospital._id;
        this.changeHospital(this.doctor.hospital); 
        // console.log(this.doctor);
      }
    );

  }

   // cambio de hospital
   changeHospital(id) {
    // console.log(id);
    this._hospitalService.getHospital(id).subscribe(
      (response: any) => {
        this.hospital = response.hospital;
        // console.log(this.hospital);
      }
    );
  }

   // Mostrar Modal
   showModal(type: string, id: string, image: string, google: boolean) {
    this._modalUploadService.showModal(type, id, image, google);
  }


}
