import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, exhaustMap } from 'rxjs';
import { IncidentService } from '../core/services/incident';
import { IncidentActions } from './incident.actions';

@Injectable()


export class IncidentEffects {

    private actions$ = inject(Actions);
    public incidentService = inject(IncidentService)


    loadIncidentsEffect = createEffect(() =>
        // actions$ stream of every action dispatched in the application.
        this.actions$.pipe(
            ofType(IncidentActions.loadIncidents), // Only loadIncidents action
            mergeMap(() =>
                this.incidentService.getIncidents().pipe(
                    map((incidents) => IncidentActions.loadIncidentsSuccess({ incidents })),
                    catchError((error) => of(IncidentActions.loadIncidentsFailure({ error: error.message })))
                )
            )
        ),
        { functional: true }
    )

    createIncidentEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(IncidentActions.createIncident),
            mergeMap(({ incident }) =>
                this.incidentService.createIncident(incident).pipe(
                    map(savedIncident => IncidentActions.createIncidentSuccess({ incident: savedIncident })),
                    catchError(error => of(IncidentActions.createIncidentFailure({ error: error.message })))
                )
            )
        ),
        { functional: true }
    );

    updateIncidentEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(IncidentActions.updateIncident),
            mergeMap(({ incident, id }) =>
                this.incidentService.updateIncident(id, incident).pipe(
                    map((incident) => IncidentActions.updateIncidentSuccess({ incident, id })),
                    catchError((error) => of(IncidentActions.updateIncidentFailure({ error: error.message })))
                )
            )
        ),
        { functional: true }
    );

    deleteIncidentEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(IncidentActions.deleteIncident),
            mergeMap(({ id }) =>
                this.incidentService.deleteIncident(id).pipe(
                    map(() => IncidentActions.deleteIncidentSuccess({ id })),
                    catchError((error) => of(IncidentActions.deleteIncidentFailure({ error: error.message })))
                )
            )
        ),
        { functional: true }
    );
}

