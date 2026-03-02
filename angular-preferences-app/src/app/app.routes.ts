import { Routes } from '@angular/router';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'configurations',
        component: PreferencesComponent,
    },
];