import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgClass, CommonModule } from '@angular/common';
import { ApiServiceService } from '@service/api-service.service';
import { formatDate } from '@angular/common';
import { Survey } from '../../models/survey.model';
import { NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [NgFor, NgClass, CommonModule],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.css'
})
export class SurveyListComponent implements OnInit {
  surveys: Survey[] = [];
  
  constructor(private ngZone: NgZone, private service: ApiServiceService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // Consumir el servicio para obtener las encuestas
    this.service.getAllSurvey().subscribe(
      (data: Survey[]) => {
        // Asignar los datos a la propiedad surveys
        this.surveys = data.map((survey) => ({
          ...survey,
          createdAt: formatDate(survey.createdAt, 'yyyy-MM-dd', 'en-US'), // Formatear la fecha
        }));
      },
      (error) => {
        console.error('Error fetching surveys:', error);
      }
    );
  }

    // Función para crear nueva encuesta
    createNewSurvey() {
      this.router.navigate(['/create-survey']);
    }
  
    // Función para ver los resultados de una encuesta
    viewResults(surveyId: number) {
      this.router.navigate(['/survey-response-viewer', surveyId]);
    }
  
    // Función para editar una encuesta
    editSurvey(surveyId: number) {
      this.router.navigate(['/edit-survey', surveyId]);
    }
}
