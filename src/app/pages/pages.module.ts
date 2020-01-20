
// Principal Modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Components
// import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { IncreaseComponent } from '../components/increase/increase.component';
import { GraphicsDoughnutComponent } from '../components/graphics-doughnut/graphics-doughnut.component';
import { PromesasComponent } from './promesas/promesas.component';
import { ProfileComponent } from './profile/profile.component';
// import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { UsersComponent } from './users/users.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';

// Modules
import { SharedModule } from '../shared/shaerd.module';
import { PAGES_ROUTES } from './pages.routes';

// MODULO DE GRAFICAS
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Pipe Module
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { CompanysComponent } from './companys/companys.component';
import { AddcompanyComponent } from './addcompany/addcompany.component';

@NgModule({
    declarations: [
        // PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
        IncreaseComponent,
        GraphicsDoughnutComponent,
        AccountSettingsComponent,
        PromesasComponent,
        ProfileComponent,
        UsersComponent,
        // ModalUploadComponent,
        HospitalsComponent,
        DoctorsComponent,
        DoctorComponent,
        SearchComponent,
        CompanysComponent,
        AddcompanyComponent
    ],
    exports: [
        // PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        PipesModule
    ],
    providers: [],
    bootstrap: []
  })
  export class PagesModule { }