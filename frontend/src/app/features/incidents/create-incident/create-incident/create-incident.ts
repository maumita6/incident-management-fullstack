import { Component, output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Incident } from '../../../../shared/models/incident.model';

@Component({
  selector: 'app-create-incident',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './create-incident.html'
})
export class CreateIncidentComponent {

  private dialogRef = inject(MatDialogRef<any>);

  // bind fields

  incidentName = '';
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';

  onSubmit() {
    if (!this.incidentName.trim())
      return;

    // build payload 
    const payload = {
      incidentName: this.incidentName,
      severity: this.severity,
      commentDescription: '',
      status: 'NEW',
      commentCreatedAt: new Date().toISOString()
    }

    this.dialogRef.close(payload);

  }

  cancel() {
    this.dialogRef.close()
  }
}
