import { EmployeeViewModel } from './employee-view.model';

export class EmployeeDetailsViewModel extends EmployeeViewModel {
    workingOn?: number[];

    constructor(id: number, firstName: string, lastName: string, workingOn?: number[]) {
        super();

        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.workingOn = workingOn;
    }
}