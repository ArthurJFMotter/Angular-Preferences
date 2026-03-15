import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; 

export const routes: Routes =[
    // --- Eagerly loaded routes ---
    {
        path: '',
        component: HomeComponent, 
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent, 
    },
    // --- Lazzy loaded routes ---
    {
        path: 'configurations',
        loadComponent: () => import('./pages/preferences/preferences.component').then(c => c.PreferencesComponent),
    },
    // wildecard
    {
        path: '**',
        redirectTo: ''
    }
];