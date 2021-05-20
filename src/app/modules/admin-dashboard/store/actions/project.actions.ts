import { createAction, props } from '@ngrx/store';
import { ProjectBindingModel } from '../../models/project-models/binding-models/project-binding.model';

export const addProject = createAction(
  '[Project] Add Project',
  (project: ProjectBindingModel) => ({project})
);

export const deleteProject = createAction(
  '[Project] Delete Project',
  (projectId: number) => ({projectId})
);

export const updateProject = createAction(
  '[Project] Update Project',
  (projectId: number , project: ProjectBindingModel) => ({projectId, project})
);