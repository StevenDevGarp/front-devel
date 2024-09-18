import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Mock function to simulate API call
const createSurvey = async (survey: Survey): Promise<{ success: boolean; message: string; id: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const mockId = Math.random().toString(36).substr(2, 9);
  return { success: true, message: 'Survey created successfully!', id: mockId };
};

type FieldType = 'Number' | 'Text' | 'Date' | 'MultipleChoice' | 'SingleChoice';

interface SurveyField {
  name: string;
  type: FieldType;
  required: boolean;
  options?: string[]; // For MultipleChoice and SingleChoice
}
interface Survey {
  id?: string;
  name: string;
  description: string;
  fields: SurveyField[];
}

@Component({
  selector: 'app-create-survey',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.css'
})
export class CreateSurveyComponent {
  surveyForm: FormGroup;
  isSubmitting = false;
  fieldTypes: FieldType[] = ['Number', 'Text', 'Date', 'MultipleChoice', 'SingleChoice'];

  constructor(private fb: FormBuilder, private router: Router) {
    this.surveyForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      fields: this.fb.array([]),
    });
  }

  get fields(): FormArray {
    return this.surveyForm.get('fields') as FormArray;
  }

  addField(): void {
    const fieldGroup = this.fb.group({
      name: ['', Validators.required],
      type: ['Text', Validators.required],
      required: [false],
      options: this.fb.array([]),
    });
    this.fields.push(fieldGroup);
  }

  removeField(index: number): void {
    this.fields.removeAt(index);
  }

  validateSurvey(): boolean {
    if (this.surveyForm.invalid) {
      alert('Please fill in all required fields.');
      return false;
    }
    if (this.fields.length === 0) {
      alert('At least one field is required.');
      return false;
    }
    return true;
  }

  async handleSubmit(): Promise<void> {
    if (!this.validateSurvey()) {
      return;
    }

    this.isSubmitting = true;
    try {
      const survey: Survey = this.surveyForm.value;
      const result = await createSurvey(survey);
      if (result.success) {
        alert(result.message);
        this.router.navigate([`/surveys/${result.id}`]);
      } else {
        alert('Failed to create survey.');
      }
    } catch (error) {
      alert('An unexpected error occurred.');
    } finally {
      this.isSubmitting = false;
    }
  }
}
