import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Incident } from '../shared/models/incident.model';


export const IncidentActions = createActionGroup({
    source: 'Incidents',
    events: {
        'Load Incidents': emptyProps(),
        'Load Incidents Success': props<{ incidents: Incident[] }>(),
        'Load Incidents Failure': props<{ error: string }>(),

        //  Create Incidents
        'Create Incident': props<{ incident: Omit<Incident, '_id' | 'createdAt'> }>(),
        'Create Incident Success': props<{ incident: Incident }>(),
        'Create Incident Failure': props<{ error: string }>(),

        // Delete
        'Delete Incident': props<{ id: string }>(),
        'Delete Incident Success': props<{ id: string }>(),
        'Delete Incident Failure': props<{ error: string }>(),

        //  Update Incidents
        'Update Incident': props<{ incident: Incident, id: any }>(),
        'Update Incident Success': props<{ incident: Incident, id: any }>(),
        'Update Incident Failure': props<{ error: string }>(),
    },
});