import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IncidentsDashboard } from './incidents-dashboard';

describe('IncidentsDashboard', () => {
  let component: IncidentsDashboard;
  let fixture: ComponentFixture<IncidentsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentsDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(IncidentsDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
