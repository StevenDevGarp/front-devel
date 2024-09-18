import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';

type FieldType = 'Number' | 'Text' | 'Date' | 'MultipleChoice' | 'SingleChoice';

interface SurveyField {
  name: string;
  type: FieldType;
  required: boolean;
  options?: string[];
}

interface Survey {
  id: string;
  name: string;
  description: string;
  fields: SurveyField[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface SurveyResponse {
  id: string;
  surveyId: string;
  answers: Record<string, string | string[] | number | Date>;
  submittedAt: string;
}

// Función simulada para obtener datos de encuesta con respuestas
const fetchSurveyWithResponses = async (id: string): Promise<{ survey: Survey; responses: SurveyResponse[] }> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const survey: Survey = {
    id,
    name: 'Customer Satisfaction Survey',
    description: 'Results of our customer feedback survey',
    fields: [
      { name: 'Name', type: 'Text', required: true },
      { name: 'Age', type: 'Number', required: true },
      { name: 'Feedback', type: 'Text', required: false },
      { name: 'Visit Date', type: 'Date', required: true },
      { name: 'Overall Experience', type: 'SingleChoice', required: true, options: ['Excellent', 'Good', 'Average', 'Poor'] },
      { name: 'Areas of Improvement', type: 'MultipleChoice', required: false, options: ['Service', 'Product Quality', 'Cleanliness', 'Price'] },
    ],
    createdBy: 'John Doe',
    createdAt: '2023-06-01T12:00:00Z',
    updatedAt: '2023-06-01T12:00:00Z',
  };

  const responses: SurveyResponse[] = [
    {
      id: '1',
      surveyId: id,
      answers: {
        Name: 'Alice Johnson',
        Age: 28,
        Feedback: 'Great service, but the prices are a bit high.',
        'Visit Date': new Date('2023-06-15'),
        'Overall Experience': 'Good',
        'Areas of Improvement': ['Price'],
      },
      submittedAt: '2023-06-15T14:30:00Z',
    },
    {
      id: '2',
      surveyId: id,
      answers: {
        Name: 'Bob Smith',
        Age: 35,
        Feedback: 'Excellent product quality, but service could be improved.',
        'Visit Date': new Date('2023-06-16'),
        'Overall Experience': 'Excellent',
        'Areas of Improvement': ['Service'],
      },
      submittedAt: '2023-06-16T10:15:00Z',
    },
  ];

  return { survey, responses };
};

@Component({
  selector: 'app-survey-response-viewer',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe],
  templateUrl: './survey-response-viewer.component.html',
  styleUrl: './survey-response-viewer.component.css'
})
export class SurveyResponseViewerComponent implements OnInit {
  surveyData: { survey: Survey; responses: SurveyResponse[] } | null = null;
  loading = true;

  constructor(private route: ActivatedRoute, private datePipe: DatePipe) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.loadSurveyWithResponses(id);
  }

  async loadSurveyWithResponses(id: string) {
    try {
      this.surveyData = await fetchSurveyWithResponses(id);
    } catch (error) {
      console.error('Failed to fetch survey with responses:', error);
    } finally {
      this.loading = false;
    }
  }

  formatDate(value: any, formatString: string) {
    if (value instanceof Date || typeof value === 'string') {
      return this.datePipe.transform(value, formatString);
    }
    return 'Invalid date';
  }

  isOptionSelected(answer: any, option: string): boolean {
    if (Array.isArray(answer)) {
      return answer.includes(option);
    }
    return false;
  }
}

