import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurverViewComponent } from './surver-view.component';

describe('SurverViewComponent', () => {
  let component: SurverViewComponent;
  let fixture: ComponentFixture<SurverViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurverViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SurverViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
