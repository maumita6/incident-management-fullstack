import { Component, input, inject, output, signal, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableComponent } from '../../../../shared/ui/table/mat-table/mat-table';
import { TableColumn } from '../../../../shared/models/tablecolumn.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncidentService, IncidentModel } from '../../../../core/services/incident';
import { IncidentListComponent } from '../../incident-list/incident-list/incident-list';
import { Store } from '@ngrx/store';
import { IncidentActions } from '../../../../state/incident.actions';
import { incidentReducer } from '../../../../state/incident.reducer';

import { selectAllIncidents, selectIncidentLoading } from '../../../../state/incident.selectors';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateIncidentComponent } from '../../create-incident/create-incident/create-incident';

@Component({
  imports: [ReactiveFormsModule, CommonModule, IncidentListComponent, MatDialogModule],
  selector: 'app-incidents-dashboard',
  styleUrl: './incidents-dashboard.css',
  templateUrl: './incidents-dashboard.html',
  standalone: true,

})
export class IncidentsDashboard implements OnInit {

  private router = inject(Router);
  private fb = inject(FormBuilder);
  private incidentService = inject(IncidentService);
  public store = inject(Store);
  private dialog = inject(MatDialog);

  incidentsList = signal<IncidentModel[]>([]);

  incidentList$ = this.store.select(selectAllIncidents);
  isLoading$ = this.store.select(selectIncidentLoading);



  ngOnInit() {
    // this.loadAllIncidents();
    console.log(this.incidentList$);
    this.store.dispatch(IncidentActions.loadIncidents());

  }

  /*loadAllIncidents(): void {
    this.incidentService.getIncidents().subscribe({
      next: (data) => this.incidentsList.set(data),
      error: (err: any) => {
        console.error('Error deleting request:', err);
      }
    })
  }*/

  handleIncidentCreated(newItem: any) {
    this.store.dispatch(IncidentActions.createIncident({ incident: newItem }));
  }

  openCreateIncidentModal() {
    const dialogRef = this.dialog.open(CreateIncidentComponent, {
      width: '450px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe((resultPayload) => {
      if (resultPayload) {
        this.store.dispatch(IncidentActions.createIncident({ incident: resultPayload }));
      }
    });
  }
}
