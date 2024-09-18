import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiServiceService } from '@service/api-service.service'; // Asegúrate de que la ruta sea correcta
import { Survey } from '../../models/survey.model'; // Asegúrate de que la ruta sea correcta



@Component({
  selector: 'app-surver-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './surver-view.component.html',
  styleUrl: './surver-view.component.css'
})
export class SurverViewComponent implements OnInit {
  survey: Survey | null = null;
  loading = true;
  formValues: any = {}; // Objeto para almacenar los valores del formulario

  constructor(private route: ActivatedRoute, private apiService: ApiServiceService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSurvey(id);
    }
  }

  // Método para cargar la encuesta usando el servicio
  loadSurvey(id: string) {
    this.apiService.getSurvey(id).subscribe({
      next: (survey: Survey) => {
        this.survey = survey;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to fetch survey:', error);
        this.loading = false;
      }
    });
  }

  // Método para manejar el envío de la encuesta
  submitSurvey() {
    if (this.survey) {
      const surveyId = this.survey.id;
      this.apiService.answerSurvey(String(surveyId), this.formValues).subscribe({
        next: (response) => {
          console.log('Survey submitted successfully:', response);
          // Podrías agregar aquí un mensaje de éxito o redirigir al usuario
        },
        error: (error) => {
          console.error('Error submitting survey:', error);
        }
      });
    }
  }
}