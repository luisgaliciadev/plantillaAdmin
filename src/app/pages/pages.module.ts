
// Principal Modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { IncreaseComponent } from '../components/increase/increase.component';
import { GraphicsDoughnutComponent } from '../components/graphics-doughnut/graphics-doughnut.component';
import { PromesasComponent } from './promesas/promesas.component';


// Modules
import { SharedModule } from '../shared/shaerd.module';
import { PAGES_ROUTES } from './pages.routes';

// MODULO DE GRAFICAS
import { ChartsModule } from 'ng2-charts';
import { AccountSettingsComponent } from './account-settings/account-settings.component';




@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component,
        IncreaseComponent,
        GraphicsDoughnutComponent,
        AccountSettingsComponent,
        PromesasComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graphics1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule
    ],
    providers: [],
    bootstrap: []
  })
  export class PagesModule { }