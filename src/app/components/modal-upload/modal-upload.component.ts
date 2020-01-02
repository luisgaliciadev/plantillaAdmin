import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { UploadFileService } from '../../services/uploadFile/upload-file.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {


  //public user: User;
  public imageUpload: File;
  public tempImage: string;
  public google: boolean;

  constructor(
    // tslint:disable-next-line: variable-name
    public _uploadFile: UploadFileService,
    // tslint:disable-next-line: variable-name
    public _modalUploadService: ModalUploadService
  ) {
    console.log('modal listo');
  }

  ngOnInit() {
  }

  // Seleccionar imagen
  selectImage(file: File) {

    if (!file) {
      this.imageUpload = null;
      return;
    } else {

      if (file.type.indexOf('image') < 0) {
        this.imageUpload = null;
        // Swal.fire('Mensaje', 'Disculpe, tipo de archvio no valido', 'warning');
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

  uploadImage() {
    this._uploadFile.uploadFile(this.imageUpload, this._modalUploadService.type, this._modalUploadService.id)
      .then( resp => {
        console.log(resp);
        this._modalUploadService.notificacion.emit(resp);
        this.closeModal();
      })
      .catch( err => {
        console.log('Error Al subir la Imagen.');
      });
  }

  closeModal() {
    this.imageUpload = null;
    this.tempImage = null;

    this._modalUploadService.hideModal();
  }

}
