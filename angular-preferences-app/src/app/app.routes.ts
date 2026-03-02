import { Routes } from '@angular/router';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { HomeComponent } from './pages/home/home.component';
import { LivePreviewComponent } from './pages/live-preview/live-preview.component';

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
    // for future use
    /*{
        path: 'preview',
        component: LivePreviewComponent,
    },*/
    {
        path: 'configurations',
        component: PreferencesComponent,
    },
];