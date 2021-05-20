import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/modules/core/components/confirm-dialog/confirm-dialog.component';
import { ProjectStatusTypes } from '../../enums/project-status-types.enum';

import { ProjectViewModel } from '../../models/project-models/view-models/project-view.model';
import { deleteProject } from '../../store/actions/project.actions';
import { selectProjects } from '../../store/selectors/admin-dashboard.selectors';
import { AdminDashboardState } from '../../store/state/admin-dashboard.state';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects$: Observable<ProjectViewModel[]>
  projectStatusTypes: typeof ProjectStatusTypes;
  
  constructor(private store: Store<AdminDashboardState>, private router: Router, public dialog: MatDialog) {
    this.projects$ = this.store.pipe(select(selectProjects));

    this.projectStatusTypes = ProjectStatusTypes;
  }

  ngOnInit(): void {
  }

  openConfirmationDialog(project: ProjectViewModel) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '260px',
      data: {name: project.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.store.dispatch(deleteProject(project.id));
      }
    });
  }

  onNewButtonClicked(): void {
    this.router.navigateByUrl('admin/projects/create');
  }
}