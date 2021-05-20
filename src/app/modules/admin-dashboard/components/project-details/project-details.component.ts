import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ProjectStatusTypes } from '../../enums/project-status-types.enum';
import { EmployeeViewModel } from '../../models/employee-models/view-models/employee-view.model';
import { ProjectDetailsViewModel } from '../../models/project-models/view-models/project-details-view.model';
import { selectEmployees, selectProjectById } from '../../store/selectors/admin-dashboard.selectors';
import { AdminDashboardState } from '../../store/state/admin-dashboard.state';
import { addProject, updateProject } from '../../store/actions/project.actions';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  projectForm: FormGroup;
  employees$: Observable<EmployeeViewModel[]>;
  projectId: string;
  projectStatusTypes: typeof ProjectStatusTypes;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private adminDashboardStore: Store<AdminDashboardState>, private location: Location) {
    this.projectStatusTypes = ProjectStatusTypes;
  }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.params.id;
    if (this.projectId) {
      this.adminDashboardStore.select(selectProjectById, parseInt(this.projectId)).subscribe((project) => {
        this.projectForm = this.generateProjectForm(project);
      });
    }
    else {
      this.projectForm = this.generateProjectForm();
    }

    this.employees$ = this.adminDashboardStore.pipe(select(selectEmployees))
  }

  onSubmit(): void {
    if(this.projectForm.valid) {
      console.log(this.projectForm.value);
      if (this.projectId) {
        this.adminDashboardStore.dispatch(updateProject(parseInt(this.projectId), this.projectForm.value, ));
      }
      else {
        this.adminDashboardStore.dispatch(addProject(this.projectForm.value));
      }

      this.location.back();
    } 
    else {
      this.projectForm.markAllAsTouched();
    }
  }

  private generateProjectForm(project?: ProjectDetailsViewModel): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(project ? project.name : '', [Validators.required]),
      revenue: new FormControl(project ? project.revenue : '', [Validators.required]),
      status: new FormControl(project ? project.status: this.projectStatusTypes.Active),
      createdOn: new FormControl(project ? project.createdOn : new Date().toISOString().split('T')[0]),
      assignedTo: new FormControl(project ? project.assignedTo : '')
    });
  }

}
