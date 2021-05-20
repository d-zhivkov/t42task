import { EmployeeBaseModel } from '../base-models/employee-base.model';

export class EmployeeBindingModel extends EmployeeBaseModel {
    workingOn?: number[];

    constructor() {
        super();

        this.workingOn = [];
    }
}