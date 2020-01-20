import { Component, OnInit } from '@angular/core';
import { CompanyUser } from '../../models/companyUser.model';
import { UserService } from '../../services/user/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styles: []
})
export class AddcompanyComponent implements OnInit {

  public companyUser: CompanyUser;
  public imageUpload: File;
  public tempImage: string;
  public google: boolean;
  public ID_COMPANY_USER: number;

  constructor(
    // tslint:disable-next-line: variable-name
    public _userService: UserService,
    // tslint:disable-next-line: variable-name
    public _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    public _router: Router

  ) {
    this.google = false;
    this.companyUser = new CompanyUser('', 0, '', '');
  }

  ngOnInit() {
    this._route.params.forEach((params: Params) => {
      this.ID_COMPANY_USER = params.id;
    });

    if (this.ID_COMPANY_USER > 0) {
      this.getCompany();
    }
  }

  // Listar usuarios
  getCompany() {

    this._userService.getCompany(this.ID_COMPANY_USER).subscribe(
      (response: any) => {
        if (response === 0) {
          console.log(response);
          this._router.navigate(['/company', 0]);
        } else {
          this.companyUser = response.company;
        }
      }
    );

  }

  saveCompany(companyUser) {
    console.log(companyUser);
  }

  updateCompany(companyUser) {
  
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
    this._userService.changeImageCompany(this.imageUpload, this.ID_COMPANY_USER);
  }


}
