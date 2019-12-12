import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graphics1Component } from './pages/graphics1/graphics1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './register/register.component';


const appRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent},
            { path: 'progress', component: ProgressComponent},
            { path: 'Graphics1', component: Graphics1Component},
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
        ]
    },
    { path: '', component: PagesComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', component: NopagefoundComponent}
]

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );