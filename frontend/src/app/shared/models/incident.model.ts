export interface Incident {
    _id?: string;
    incidentName: string;
    commentDescription: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    status: 'NEW' | 'OPEN' | 'INVESTIGATING' | 'RESOLVED';
    createdAt?: Date;
    updatedAt?: Date;
    commentCreatedAt: string;
}
