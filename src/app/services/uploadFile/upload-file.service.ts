import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor() { }

  uploadFile(file: File, type: string, id: number) {

    return new Promise( (resolve, reject) => {

      // tslint:disable-next-line: prefer-const
      let formData = new FormData();
      // tslint:disable-next-line: prefer-const
      let xhr = new XMLHttpRequest();

      formData.append('image', file, file.name );

      // tslint:disable-next-line: only-arrow-functions
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('imagen subida');
            resolve (JSON.parse(xhr.response));

          } else {
            console.log('Fallo la subida');
            reject (JSON.parse(xhr.response));
          }
        }
      };

      // tslint:disable-next-line: prefer-const
      let url = URL_SERVICES + '/upload/' + type + '/' + id;

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }

}
