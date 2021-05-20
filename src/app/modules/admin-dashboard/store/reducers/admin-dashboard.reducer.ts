import { Action, createReducer, on } from '@ngrx/store';
import { ProjectDetailsViewModel } from '../../models/project-models/view-models/project-details-view.model';

import * as ProjectActions from '../actions/project.actions';
import * as EmployeeActions from '../actions/employee.actions';

import { AdminDashboardState, initialState } from '../state/admin-dashboard.state';
import { EmployeeDetailsViewModel } from '../../models/employee-models/view-models/employee-details-view.model';

export const adminDashboardFeatureKey = 'adminDashboard';

export const adminDashboardReducer = createReducer(
  initialState,
  on(ProjectActions.addProject,
    (state: AdminDashboardState, {project}) => {
      let employees = [...state.employees];
      project.assignedTo.forEach((empId) => {
        for(let index=0; employees.length; index+=1) {
          if (employees[index].id === empId) {
            let tempEmp = {...employees[index]};
            tempEmp.workingOn = [...employees[index].workingOn, state.projects.length + 1];
            employees[index] = tempEmp;
            break;
          }
        }
      })

      return {
        projects: [...state.projects, new ProjectDetailsViewModel(state.projects.length + 1, project.name, project.status,project.createdOn, project.revenue, project.assignedTo)],
        employees: employees
      };
    }),
  on(ProjectActions.updateProject,
    (state: AdminDashboardState, {projectId, project}) => {
      let projects = [...state.projects];
      let employees = [...state.employees];

      let projectIndex = projects.findIndex(proj => proj.id === projectId);
      projects[projectIndex] = {...new ProjectDetailsViewModel(projectId, project.name, project.status, project.createdOn, project.revenue, project.assignedTo)};
    
      employees.forEach((employee, index) => {
        let tempEmp = {...employee};
        if (employee.workingOn.includes(projectId)) {
          tempEmp.workingOn = employee.workingOn.filter(pid => pid !== projectId);
        }

        employees[index] = tempEmp;
      });

      project.assignedTo.forEach((eid) => {
        employees.forEach((emp, index) => {
          let tempEmp = {...emp};
          if (emp.id === eid) {
            tempEmp.workingOn = [...emp.workingOn, projectId]
          }
          
          employees[index] = tempEmp;
        })
      });

      return {
        projects: projects,
        employees: employees
      }
    }),
  on(ProjectActions.deleteProject,
    (state: AdminDashboardState, {projectId}) => {
      let updatedEmployees = [...state.employees];
      
      updatedEmployees.forEach((emp,index) => {
        if(emp.workingOn.includes(projectId)) {
          let tempEmp = {...emp};
          tempEmp.workingOn = tempEmp.workingOn.filter((pId) => pId !== projectId);
          updatedEmployees[index] = tempEmp;
        }
      });

      return {
        employees: updatedEmployees,
        projects: [...state.projects.filter(p => p.id !== projectId)]
      }
    }),
  on(EmployeeActions.addEmployee,
    (state: AdminDashboardState, {employee}) => {
      let projects = [...state.projects];
      employee.workingOn.forEach((pId) => {
        for(let index=0; projects.length; index+=1) {
          if (projects[index].id === pId) {
            let tempProject = {...projects[index]};
            tempProject.assignedTo = [...projects[index].assignedTo, state.employees.length + 1];
            projects[index] = tempProject;
            break;
          }
        }
      })

      return {
        projects: projects,
        employees: [...state.employees, new EmployeeDetailsViewModel(state.employees.length + 1, employee.firstName, employee.lastName, employee.workingOn)]
      }
  }),
  on(EmployeeActions.updateEmployee,
    (state: AdminDashboardState, {employeeId, employee}) => {
      let projects = [...state.projects];
      let employees = [...state.employees];

      let employeeIndex = employees.findIndex(emp => emp.id === employeeId);
      employees[employeeIndex] = {...new EmployeeDetailsViewModel(employeeId, employee.firstName, employee.lastName, employee.workingOn)};
    
      projects.forEach((project, index) => {
        let tempProj = {...project};
        if (project.assignedTo.includes(employeeId)) {
          tempProj.assignedTo = project.assignedTo.filter(eid => eid !== employeeId);
        }

        projects[index] = tempProj;
      });

      employee.workingOn.forEach((pid) => {
        projects.forEach((proj, index) => {
          let tempProj = {...proj};
          if (proj.id === pid) {
            tempProj.assignedTo = [...proj.assignedTo, employeeId]
          }
          
          projects[index] = tempProj;
        })
      });

      return {
        projects: projects,
        employees: employees
      }
    }),
  on(EmployeeActions.deleteEmployee,
    (state: AdminDashboardState, {employeeId})=> {
      let updatedProjects = [...state.projects];
      
      updatedProjects.forEach((p, index) => {
        if(p.assignedTo.includes(employeeId)) {
          let tempProject = {...p};
          tempProject.assignedTo = tempProject.assignedTo.filter((empId) => empId !== employeeId);
          updatedProjects[index] = tempProject;
        }
      });

      return {
        projects: updatedProjects,
        employees: [...state.employees.filter(emp => emp.id !== employeeId)]
      }
    }),
);

export function reducer(state: AdminDashboardState | undefined, action: Action): any {
    return adminDashboardReducer(state, action);
}