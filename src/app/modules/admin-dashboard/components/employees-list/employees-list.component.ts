import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/modules/core/components/confirm-dialog/confirm-dialog.component';

import { EmployeeViewModel } from '../../models/employee-models/view-models/employee-view.model';
import { deleteEmployee } from '../../store/actions/employee.actions';
import { selectEmployees } from '../../store/selectors/admin-dashboard.selectors';
import { AdminDashboardState } from '../../store/state/admin-dashboard.state';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employees$: Observable<EmployeeViewModel[]>

  constructor(private store: Store<AdminDashboardState>, private router: Router, public dialog: MatDialog) {
    this.employees$ = this.store.pipe(select(selectEmployees))
  }

  ngOnInit(): void {
  }

  openConfirmationDialog(employee: EmployeeViewModel) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '260px',
      data: {name: employee.firstName + ' ' + employee.lastName}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.confirm) {
        this.store.dispatch(deleteEmployee(employee.id));
      }
    });
  }

  onNewButtonClicked(): void {
    this.router.navigateByUrl('admin/employees/create');
  }
}
