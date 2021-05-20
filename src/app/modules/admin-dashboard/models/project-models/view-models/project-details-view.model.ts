import { ProjectStatusTypes } from '../../../enums/project-status-types.enum';
import { ProjectBaseModel } from '../base-models/project-base.model';

export class ProjectDetailsViewModel extends ProjectBaseModel {
    id: number;
    assignedTo: number[];

    constructor(id: number, name: string, status: ProjectStatusTypes, createdOn: Date | string, revenue: number, assignedTo?: number[]) {
        super();

        this.id = id;
        this.name = name;
        this.status = status;
        this.createdOn = createdOn;
        this.revenue = revenue;
        this.assignedTo = assignedTo;
    }
}