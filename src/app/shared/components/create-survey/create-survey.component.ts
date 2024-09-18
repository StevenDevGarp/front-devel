import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '@service/api-service.service';  // Importar el servicio real
import { Survey } from '../../models/survey.model';  
import { ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-survey',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.css'
})
export class CreateSurveyComponent {
  surveyForm: FormGroup;
  isSubmitting = false;
  fieldTypes: string[] = ['Number', 'Text', 'Date', 'MultipleChoice', 'SingleChoice'];

  constructor(private fb: FormBuilder, private router: Router, private surveyService: ApiServiceService) {
    this.surveyForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      fields: this.fb.array([]),
    });
  }

  // Getter para obtener el array de campos
  get fields(): FormArray {
    return this.surveyForm.get('fields') as FormArray;
  }

  // Función para agregar un nuevo campo al formulario
  addField(): void {
    const fieldGroup = this.fb.group({
      name: ['', Validators.required],
      type: ['Text', Validators.required],
      required: [false],
      options: this.fb.array([]),
    });
    this.fields.push(fieldGroup);
  }

  // Función para eliminar un campo específico
  removeField(index: number): void {
    this.fields.removeAt(index);
  }

  // Función de validación para el formulario
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

  // Función para manejar el envío del formulario
  handleSubmit(): void {
    if (!this.validateSurvey()) {
      return;
    }

    this.isSubmitting = true;
    const survey: Survey = this.surveyForm.value;

    // Llamada al servicio para crear la encuesta
    this.surveyService.createSurvey(survey).subscribe(
      (response) => {
        // Manejar la respuesta exitosa
        alert('Survey created successfully!');
        this.router.navigate([`/surveys/${response.id}`]);  // Redirigir a la vista de la encuesta recién creada
      },
      (error) => {
        // Manejar errores
        console.error('Error creating survey:', error);
        alert('Failed to create survey.');
      },
      () => {
        this.isSubmitting = false;
      }
    );
  }
}
