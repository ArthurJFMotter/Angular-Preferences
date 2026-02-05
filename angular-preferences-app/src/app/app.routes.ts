import { Routes } from '@angular/router';
import { PreferencesComponent } from './pages/preferences/preferences.component';
import { ShowcaseComponent } from './pages/showcase/showcase.component';

export const routes: Routes = [
    {
        path: '',
        component: ShowcaseComponent,
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: ShowcaseComponent,
    },
    {
        path: 'configurations',
        component: PreferencesComponent,
    },
];