import { Service } from '@angular/core';
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { environment } from '../../../environments/environment';

export interface IncidentModel {
    _id?: string;
    incidentName: string;
    commentDescription: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    status: 'NEW' | 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
    createdAt?: Date;
    updatedAt?: Date;
    commentCreatedAt: string;
}


@Service()
export class IncidentService {

    private http = inject(HttpClient);
    //private apiURL = 'http://localhost:3003/api/incidents';
    private apiURL = `${environment.apiUrl}/users`

    // Get all requests
    //gets multiple records from the collection, so Observable<IncidentModel[]>
    getIncidents(): Observable<IncidentModel[]> {
        return this.http.get<IncidentModel[]>(this.apiURL);
    }

    //POST request return a single object, not an array, so IncidentModel not IncidentModel[]
    createIncident(payloads: IncidentModel): Observable<IncidentModel> {
        return this.http.post<IncidentModel>(this.apiURL, payloads)
    }

    deleteIncident(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/${id}`)
    }

    updateIncident(id: string, payload: IncidentModel): Observable<IncidentModel> {
        return this.http.put<IncidentModel>(`${this.apiURL}/${id}`, payload);
    }

}
