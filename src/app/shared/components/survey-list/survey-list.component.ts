import { Component } from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

interface Survey {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  responses: number;
  status: 'active' | 'draft' | 'closed';
}

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.css'
})
export class SurveyListComponent {
  surveys: Survey[] = [
    {
      id: '1',
      name: 'Customer Satisfaction Survey',
      description: 'Gather feedback on our latest product release',
      createdAt: '2023-06-15',
      responses: 124,
      status: 'active',
    },
    {
      id: '2',
      name: 'Employee Engagement Survey',
      description: 'Annual survey to measure employee satisfaction',
      createdAt: '2023-05-20',
      responses: 89,
      status: 'active',
    },
    {
      id: '3',
      name: 'Market Research Survey',
      description: 'Understand market trends for our upcoming product',
      createdAt: '2023-06-01',
      responses: 0,
      status: 'draft',
    },
    // Agrega más encuestas de ejemplo si es necesario
  ];
}
