import { ProjectBaseModel } from '../base-models/project-base.model';

export class ProjectBindingModel extends ProjectBaseModel {
    assignedTo: number[];

    constructor() {
        super();

        this.assignedTo = [];
    }
}