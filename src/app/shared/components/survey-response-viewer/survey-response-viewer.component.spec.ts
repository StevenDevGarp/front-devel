import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResponseViewerComponent } from './survey-response-viewer.component';

describe('SurveyResponseViewerComponent', () => {
  let component: SurveyResponseViewerComponent;
  let fixture: ComponentFixture<SurveyResponseViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyResponseViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurveyResponseViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
