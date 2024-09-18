import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Survey} from '../../shared/models/survey.model';
import { SurveyResponse } from '../../shared/models/surveyResponse.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private apiUrl = "http://localhost:3000/survey"

  constructor(private http: HttpClient) { }

  getAllSurvey(): Observable<Survey[]> {
    return this.http.get<Survey[]>(`${this.apiUrl}/`);
  }

  createSurvey(survey: Survey): Observable<Survey> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Survey>(`${this.apiUrl}/`, survey, { headers });
  }

  getResponse(id: string | null): Observable<SurveyResponse[]> {
    return this.http.get<SurveyResponse[]>(`${this.apiUrl}/${id}/responses`)
      .pipe(
        map((responses: any[]) => {
          return responses.map(response => ({
            ...response,
            answers: JSON.parse(response.answers) // Parseamos el campo 'answers'
          }));
        })
      );
  }

    // Obtener los detalles de una encuesta específica
    getSurvey(surveyId: string): Observable<Survey> {
      return this.http.get<Survey>(`${this.apiUrl}/${surveyId}/require-response`);
    }
  
    // Enviar respuestas a una encuesta específica
    answerSurvey(surveyId: string, answers: any): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(`${this.apiUrl}/${surveyId}/response`, answers, { headers });
    }
}
