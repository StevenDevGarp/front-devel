import { Routes } from '@angular/router';
//import { authenticatedGuard } from './guards/authenticated.guard';
//import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('@components/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('@components/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'create-survey',
        loadComponent: () => import('@components/create-survey/create-survey.component').then(m => m.CreateSurveyComponent)
    },
    {
        path: 'survey/:id',
        loadComponent: () => import('@components/surver-view/surver-view.component').then(m => m.SurverViewComponent)
    },  
    {
        path: 'survey-list',
        loadComponent: () => import('@components/survey-list/survey-list.component').then(m => m.SurveyListComponent)
    },
    {
        path: 'survey-response-viewer',
        loadComponent: () => import('@components/survey-response-viewer/survey-response-viewer.component').then(m => m.SurveyResponseViewerComponent)
    }

];
