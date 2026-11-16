import { createReducer, on } from '@ngrx/store';
import { Incident } from '../shared/models/incident.model';
import { IncidentActions } from './incident.actions';

export interface IncidentState {
    incidents: Incident[];
    loading: boolean;
    error: string | null;
}

export const initialIncidentState: IncidentState = {
    incidents: [],
    loading: false,
    error: null
};

export const incidentReducer = createReducer(
    initialIncidentState,

    // load data

    on(IncidentActions.loadIncidents, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(IncidentActions.loadIncidentsSuccess, (state, { incidents }) => ({
        ...state,
        loading: false,
        incidents
    })),

    on(IncidentActions.loadIncidentsFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // create incidents

    on(IncidentActions.createIncident, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(IncidentActions.createIncidentSuccess, (state, { incident }) => ({
        ...state,
        loading: false,
        incidents: [...state.incidents, incident]
    })),

    on(IncidentActions.createIncidentFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // update incidents

    on(IncidentActions.updateIncident, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(IncidentActions.updateIncidentSuccess, (state, { incident }) => ({
        ...state,
        loading: false,
        incidents: state.incidents.map(item =>
            item._id === incident._id ? incident : item
        )
    })),

    on(IncidentActions.updateIncidentFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    // delete incidents
    on(IncidentActions.deleteIncident, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(IncidentActions.deleteIncidentSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        incidents: state.incidents.filter(item => item._id != id)
    })),

    on(IncidentActions.deleteIncidentFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),
)