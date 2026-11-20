import { Component, input, inject, output, signal, ElementRef, ViewChild, OnInit, computed } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableComponent } from '../../../../shared/ui/table/mat-table/mat-table';
import { TableColumn } from '../../../../shared/models/tablecolumn.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { form, FormField, required, email } from '@angular/forms/signals';
import { IncidentService, IncidentModel } from '../../../../core/services/incident';
import { IncidentListComponent } from '../../incident-list/incident-list/incident-list';
import { Store } from '@ngrx/store';
import { IncidentActions } from '../../../../state/incident.actions';
import { incidentReducer } from '../../../../state/incident.reducer';
import { selectAllIncidents, selectIncidentLoading, selectIncidentById } from '../../../../state/incident.selectors';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { CreateIncidentComponent } from '../../create-incident/create-incident/create-incident';
import { MatCardModule } from '@angular/material/card'; // Import the module
import { MatIconModule } from '@angular/material/icon';
import { Incident } from '../../../../shared/models/incident.model';
import { DatePipe } from '@angular/common';



@Component({
  imports: [DatePipe, MatCardModule, MatIconModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule, MatDivider],
  selector: 'app-incident-details',
  styleUrl: './incident-details.css',
  templateUrl: './incident-details.html',
})
export class IncidentDetails implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private incidentService = inject(IncidentService);
  public store = inject(Store);
  private dialog = inject(MatDialog);
  private location = inject(Location);

  private readonly history = signal<string[]>([]);

  readonly canGoBack = computed(() => this.history().length > 1);



  isEditMode = false;
  editForm!: FormGroup;
  priorityOptions = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];



  incidentList$ = this.store.select(selectAllIncidents);

  id = input.required<string>(); // catch router parameter id


  ngOnInit() {
    this.store.dispatch(IncidentActions.loadIncidents());
    this.editForm = this.fb.group({
      incidentName: ['', Validators.required],
      severity: [''],
      status: ['']
    });

    console.log(this.editForm);
  }
  // selectSignal converts the store into a Signal
  // If the route id changes, 'computed' runs again

  incident = computed<Incident | undefined>(() => {
    const currentId = this.id();
    return this.store.selectSignal(selectIncidentById(currentId))();
  });

  cancelEdit() {

  }
  goBack(): void {
    this.router.navigate(['/incidents']);
  }
  saveChanges() {
    if (this.editForm.valid) {
      if (this.incident() && this.incident()?._id) {
        const updatedPayload: IncidentModel = {
          ...this.incident(),
          ...this.editForm.value
        };
        console.log(updatedPayload);

        this.store.dispatch(IncidentActions.updateIncident({
          id: this.incident()?._id,
          incident: updatedPayload
        }))
        console.log(this.incident);
        this.isEditMode = false;
      }
    }
  }

  onSubmit() {

  }

  editDetails() {
    this.isEditMode = true;
    if (this.editForm) {
      this.editForm.patchValue({
        incidentName: this.incident()?.incidentName,
        severity: this.incident()?.severity,
        status: this.incident()?.status
      })
    }
  }

}
