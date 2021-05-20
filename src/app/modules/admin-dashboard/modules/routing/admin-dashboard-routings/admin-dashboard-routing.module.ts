import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeDetailsComponent, EmployeesListComponent, HomeComponent, ProjectDetailsComponent, ProjectsListComponent } from '../../../components';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent,
    children: [
      { 
        path: 'employees' , 
        children: [
          { path: '', pathMatch: 'full', component: EmployeesListComponent },
          { path: 'create', component: EmployeeDetailsComponent },
          { path: ':id', component: EmployeeDetailsComponent },
          { path: '**', redirectTo: ''}
        ]
      },
      { 
        path: 'projects' , 
        children: [
          { path: '', pathMatch: 'full', component: ProjectsListComponent },
          { path: 'create', component: ProjectDetailsComponent },
          { path: ':id', component: ProjectDetailsComponent },
          { path: '**', redirectTo: ''}
        ]
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
