import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type FieldType = "Number" | "Text" | "Date" | "MultipleChoice" | "SingleChoice";

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

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadSurvey(id);
    }
  }

  async loadSurvey(id: string) {
    try {
      this.survey = await this.fetchSurvey(id);
    } catch (error) {
      console.error('Failed to fetch survey:', error);
    } finally {
      this.loading = false;
    }
  }

  async fetchSurvey(id: string): Promise<Survey> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock survey data
    return {
      id,
      name: 'Customer Satisfaction Survey',
      description: 'Help us improve our services by providing your feedback',
      fields: [
        { name: 'Name', type: 'Text', required: true },
        { name: 'Age', type: 'Number', required: true },
        { name: 'Feedback', type: 'Text', required: false },
        { name: 'Visit Date', type: 'Date', required: true },
        {
          name: 'Overall Experience',
          type: 'SingleChoice',
          required: true,
          options: ['Excellent', 'Good', 'Average', 'Poor'],
        },
        {
          name: 'Areas of Improvement',
          type: 'MultipleChoice',
          required: false,
          options: ['Service', 'Product Quality', 'Cleanliness', 'Price'],
        },
      ],
      createdBy: 'John Doe',
      createdAt: '2023-06-01T12:00:00Z',
      updatedAt: '2023-06-01T12:00:00Z',
    };
  }
}