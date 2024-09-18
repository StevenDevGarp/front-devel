export interface SurveyResponse {
  id: string;
  surveyId: string;
  answers: Record<string, string | number | string[]>; // Representa las respuestas, puede ser texto, número o array para opciones múltiples
  submittedAt: string;
}