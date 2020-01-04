import { Routes, RouterModule } from '@angular/router';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graphics1Component } from './graphics1/graphics1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { DoctorComponent } from './doctors/doctor.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
            { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
            { path: 'graphics1', component: Graphics1Component, data: {titulo: 'Graficas'}},
            { path: 'account-settigns', component: AccountSettingsComponent, data: {titulo: 'Ajustes'}},
            { path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de Usuario'}},
            { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},

            // Matenimientos
            { path: 'users', component: UsersComponent, data: {titulo: 'Administración de Usuarios'}},
            { path: 'hospitals', component: HospitalsComponent, data: {titulo: 'Administración de Hospitales'}},
            { path: 'doctors', component: DoctorsComponent, data: {titulo: 'Administración de Medicos'}},
            { path: 'doctor/:id', component: DoctorComponent, data: {titulo: 'Medico'}},

            // Predeterminado
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes);