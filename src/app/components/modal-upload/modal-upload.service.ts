import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public type: string;
  public id: string;

  public oculto: string;
  public notificacion;
  public google: boolean;
  public imageProfile: string;

  constructor() {
    this.google = false;
    this.oculto = 'oculto';
    this.notificacion = new EventEmitter<any>();
    this.imageProfile = '';
   }

   hideModal() {
    this.oculto = 'oculto';
    this.type = null;
    this.id = null;
    this.google = null;
    this.imageProfile = null;
   }

   showModal(type: string, user: User) {
    this.oculto = '';
    this.id = user._id;
    this.type = type;
    this.google = user.google;
    this.imageProfile = user.image;
   }
}
