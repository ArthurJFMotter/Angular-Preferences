import { Routes } from '@angular/router';
//import { HomeComponent } from './feature/home/home.component'; 
import { PreferencesComponent } from './feature/preferences/preferences.component';

export const routes: Routes =[
    // --- Eagerly loaded routes ---
    /*{
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
    },*/
    {
        path: '',
        component: PreferencesComponent, 
        pathMatch: 'full'
    },
    // Wildcard
    {
        path: '**',
        redirectTo: ''
    }
];