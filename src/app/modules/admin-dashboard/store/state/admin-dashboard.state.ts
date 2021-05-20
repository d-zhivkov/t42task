import { EmployeeDetailsViewModel } from '../../models/employee-models/view-models/employee-details-view.model';
import { ProjectDetailsViewModel } from '../../models/project-models/view-models/project-details-view.model';

export interface AdminDashboardState {
    projects: ProjectDetailsViewModel[];
    employees: EmployeeDetailsViewModel[];
}

export const initialState: AdminDashboardState = {
    projects: [
        {
          'id': 1,
          'name': 'Tick42 Example Project 1',
          'status': 0,
          'revenue': 1700,
          'createdOn': '2021-04-02',
          'assignedTo': []
        },
        {
          'id': 2,
          'name': 'Tick42 Example Project 2',
          'status': 0,
          'revenue': 2000,
          'createdOn': '2021-04-02',
          'assignedTo': [1,2]
        },
        {
          'id': 3,
          'name': 'Tick42 Example Project 3',
          'status': 0,
          'revenue': 4400,
          'createdOn': '2021-04-02',
          'assignedTo': [3]
        },
    ],
    employees: [
        {
        'id': 1,
        'firstName': 'Dimitar',
        'lastName': 'Dimitrov',
        'workingOn': [2]
        },
        {
            'id': 2,
            'firstName': 'Lyubomir',
            'lastName': 'Gochev',
            'workingOn': [2]
        },
        {
            'id': 3,
            'firstName': 'Nina',
            'lastName': 'Antonova',
            'workingOn': [3]
        }
    ]
};