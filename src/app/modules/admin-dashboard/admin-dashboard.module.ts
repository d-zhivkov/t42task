import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { AdminDashboardRoutingModule, AngularMaterialModule } from './modules';
import { HomeComponent, HeaderComponent, FooterComponent, EmployeeDetailsComponent, EmployeesListComponent, ProjectDetailsComponent, ProjectsListComponent } from './components';

import { adminDashboardFeatureKey, reducer } from './store/reducers/admin-dashboard.reducer';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    HomeComponent, 
    HeaderComponent, 
    FooterComponent, 
    EmployeesListComponent, 
    EmployeeDetailsComponent, 
    ProjectsListComponent, 
    ProjectDetailsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AdminDashboardRoutingModule,
    StoreModule.forFeature(adminDashboardFeatureKey, reducer),
  ]
})
export class AdminDashboardModule { }
