import { Routes } from '@angular/router';

export const routes: Routes =[
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
    },
    {
        path: 'configurations',
        loadComponent: () => import('./pages/preferences/preferences.component').then(c => c.PreferencesComponent),
    },
    {
        path: '**',
        redirectTo: ''
    }
];