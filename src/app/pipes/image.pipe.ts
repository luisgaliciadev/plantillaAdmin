import { Pipe, PipeTransform } from '@angular/core';
import { utils } from '../../../../appWeb/Includes/Plugins/js-xlsx-master/types/index';
import { url } from 'inspector';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string = 'user' ): any {

    // tslint:disable-next-line: no-shadowed-variable
    let url = URL_SERVICES + '/image';

    if (!img) {
      return url + '/user/no-img';
    }

    if (img.indexOf('https') >= 0) {
      return img;
    }



    switch (type) {
      case 'user':
        url += '/user/' + img;
        break;

      case 'hosital':
        url += '/hosital/' + img;
        break;

      case 'doctor':
        url += '/doctor/' + img;
        break;

        default:
          console.log('tipo de imagen no valido.');
          url += '/user/no-img';
    }

    return url;
  }

}
