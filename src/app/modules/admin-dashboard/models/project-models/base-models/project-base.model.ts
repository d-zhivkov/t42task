import { ProjectStatusTypes } from '../../../enums/project-status-types.enum';

export abstract class ProjectBaseModel {
    name: string;
    status: ProjectStatusTypes;
    createdOn: Date | string;
    revenue: number;
}