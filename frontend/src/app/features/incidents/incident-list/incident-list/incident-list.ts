import { Component, input, inject, output, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatTableComponent } from '../../../../shared/ui/table/mat-table/mat-table';
import { TableColumn } from '../../../../shared/models/tablecolumn.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncidentService, IncidentModel } from '../../../../core/services/incident';
import { DatePipe, LowerCasePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { IncidentActions } from '../../../../state/incident.actions';

@Component({
  imports: [ReactiveFormsModule, CommonModule, MatTableComponent],
  standalone: true,
  selector: 'app-incident-list',
  styleUrl: './incident-list.css',
  templateUrl: './incident-list.html',
})
export class IncidentListComponent {
  private incidentService = inject(IncidentService);
  public store = inject(Store);
  private router = inject(Router);

  //incidentsList = signal<IncidentModel[]>([]);

  tableConfig: TableColumn[] = [
    { key: '_id', label: 'Ticket ID' },
    { key: 'incidentName', label: 'Incident Title' },
    { key: 'severity', label: 'Severity' },
    { key: 'createdAt', label: 'Date Reported', isDate: true },
    { key: 'status', label: 'Status' }
  ];

  data1 = input.required<IncidentModel[]>();

  onDeleteRow(id: any): void {
    console.log('ondeleteRow clicked ....', id);
    this.store.dispatch(IncidentActions.deleteIncident({ id }));
  }


  onViewRow(row: any) {
    console.log('VIEWS clicked, emitted value:', row);

    const incidentId = row?._id || row?.id || row;

    if (incidentId && typeof incidentId === 'string') {
      this.router.navigate(['/incidents', incidentId]);
    } else {
      console.error('Invalid incident ID --- ', row);
    }
  }




}
