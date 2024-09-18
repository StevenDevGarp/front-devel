import { Routes } from '@angular/router';
import { authenticatedGuard } from 'src/app/core/guards/authenticated.guard';
import { authGuard } from 'src/app/core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'survey-list',
        pathMatch: 'full'
    },
    {
        path: 'login', 
        loadComponent: () => import('@components/login/login.component').then(m => m.LoginComponent),
        canActivate: [authGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('@components/register/register.component').then(m => m.RegisterComponent),
        canActivate: [authGuard]
    },
    {
        path: 'create-survey', //crear encuenta
        loadComponent: () => import('@components/create-survey/create-survey.component').then(m => m.CreateSurveyComponent),
        canActivate: [authenticatedGuard]
    },
    {
        path: 'edit-survey/:id', //Editar Encuesta
        loadComponent: () => import('@components/create-survey/create-survey.component').then(m => m.CreateSurveyComponent),
        canActivate: [authenticatedGuard]
    },  
    {
        path: 'survey-list', //vista dashboard todas las encuestas
        loadComponent: () => import('@components/survey-list/survey-list.component').then(m => m.SurveyListComponent),
        canActivate: [authenticatedGuard]
    },
    {
        path: 'survey-response-viewer/:id', //vista para ver respuestas de encuesta
        loadComponent: () => import('@components/survey-response-viewer/survey-response-viewer.component').then(m => m.SurveyResponseViewerComponent),
        canActivate: [authenticatedGuard]
    },
    {
        path: 'survey/:id', //vista publica para responder encuesta
        loadComponent: () => import('@components/surver-view/surver-view.component').then(m => m.SurverViewComponent)
    }

];
