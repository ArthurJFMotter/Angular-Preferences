import { Routes } from '@angular/router';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ShowcaseComponent } from './components/showcase/showcase.component';

export const routes: Routes = [
    {
        path: '',
        component: PreferencesComponent,
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: ShowcaseComponent,
    },
];