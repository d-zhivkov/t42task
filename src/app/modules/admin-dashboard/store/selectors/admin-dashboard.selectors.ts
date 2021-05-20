import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectViewModel } from '../../models/project-models/view-models/project-view.model';

import * as fromAdminDashboard from '../reducers/admin-dashboard.reducer';
import { AdminDashboardState } from '../state/admin-dashboard.state';

export const selectAdminDashboardState = createFeatureSelector<AdminDashboardState>(
    fromAdminDashboard.adminDashboardFeatureKey,
);

export const selectEmployees = createSelector(
    selectAdminDashboardState,
    (state: AdminDashboardState) => state.employees
);

export const selectEmployeeById = createSelector(
    selectAdminDashboardState,
    (state: AdminDashboardState, projectId: number) => state.employees.find(p => p.id === projectId)
);

export const selectProjects = createSelector(
    selectAdminDashboardState,
    (state: AdminDashboardState) => state.projects.map((project) => new ProjectViewModel(project.id, project.name, project.status, project.createdOn, project.revenue))
);

export const selectProjectById = createSelector(
    selectAdminDashboardState,
    (state: AdminDashboardState, projectId: number) => state.projects.find(p => p.id === projectId)
);