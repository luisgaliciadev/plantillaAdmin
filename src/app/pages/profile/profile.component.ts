import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../../services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public user: User;
  public imageUpload: File;
  public tempImage: string;
  public google: boolean;


  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService
  ) {
    this.user = this._userService.user;
    this.google = this.user.GOOGLE;
   }

  ngOnInit() {
  }

  saveProfile(user: User) {

    this.user.NAME = user.NAME;
    this.user.PHONE = user.PHONE;
    if (!this.user.GOOGLE) {
      this.user.EMAIL = user.EMAIL;
    }

    this._userService.updateProfile(this.user).subscribe(
      response => {
        // Swal.fire('Mensaje', 'Usuario Registrado Correctamente', 'success');
        // console.log(response);
      }
    );

    // console.log(user);
  }

  selectImage(file: File) {

    if (!file) {
      this.imageUpload = null;
      return;
    } else {

      if (file.type.indexOf('image') < 0) {
        this.imageUpload = null;
        Swal.fire('Mensaje', 'Disculpe, tipo de archvio no valido', 'warning');
        return;
      }

      this.imageUpload = file;

      // tslint:disable-next-line: prefer-const
      let reader = new FileReader();
      // tslint:disable-next-line: prefer-const
      let urlImageTemp = reader.readAsDataURL(file);
      // console.log(this.imageUpload);

      reader.onloadend = () => this.tempImage = reader.result as string;
    }
  }

  changeImage() {
    this._userService.changeImage(this.imageUpload, this.user.ID_USER);
  }


}
