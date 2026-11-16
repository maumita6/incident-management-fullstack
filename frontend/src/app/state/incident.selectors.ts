import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IncidentState } from './incident.reducer';
import { Incident } from '../shared/models/incident.model';


export const selectIncidentState = createFeatureSelector<IncidentState>('incidentConfig');

export const selectAllIncidents = createSelector(
    selectIncidentState,
    (state) => state.incidents
)

export const selectIncidentById = (id: any) => createSelector(
    selectAllIncidents,
    (incidents: Incident[]) => incidents.find(incident => incident._id === id)


)
export const selectIncidentLoading = createSelector(
    selectIncidentState,
    (state) => state.loading
)

export const selectIncidentError = createSelector(
    selectIncidentState,
    (state) => state.error
)