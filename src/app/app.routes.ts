import { Routes, RouterModule, CanActivate } from '@angular/router';


// Componets
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './register/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';



const appRoutes: Routes = [
    { path: 'login', component: LoginComponent, data: {titulo: 'Login'}},
    { path: 'register', component: RegisterComponent, data: {titulo: 'Registro'}},
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
       loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );