import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; 
import { PreferencesComponent } from './pages/preferences/preferences.component';

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
    {
        path: 'configurations',
        component: PreferencesComponent, 
    },
    // Wildcard
    {
        path: '**',
        redirectTo: ''
    }
];