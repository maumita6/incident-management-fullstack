import { Routes } from '@angular/router';
import { IncidentsDashboard } from './features/incidents/incidents-dashboard/incidents-dashboard/incidents-dashboard';
import { IncidentDetails } from './features/incidents/incident-details/incident-details/incident-details';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { MainLayoutComponent } from './layout/main-layout/main-layout';


export const routes = [
    // Public routes
    {
        path: '',
        redirectTo: 'login', // or wherever your landing page points
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
    },
    // Protected routes
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'incidents',
                loadComponent: () => import('./features/incidents/incidents-dashboard/incidents-dashboard/incidents-dashboard').then(m => m.IncidentsDashboard)
            },
            {
                path: 'incidents/:id',
                loadComponent: () => import('./features/incidents/incident-details/incident-details/incident-details').then(m => m.IncidentDetails)
            },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    }
];

