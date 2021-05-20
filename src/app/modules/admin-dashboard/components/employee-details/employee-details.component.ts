import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { EmployeeDetailsViewModel } from '../../models/employee-models/view-models/employee-details-view.model';
import { ProjectViewModel } from '../../models/project-models/view-models/project-view.model';
import { updateEmployee, addEmployee } from '../../store/actions/employee.actions';
import { selectEmployeeById, selectProjects } from '../../store/selectors/admin-dashboard.selectors';
import { AdminDashboardState } from '../../store/state/admin-dashboard.state';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: string;
  projects$: Observable<ProjectViewModel[]>;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private adminDashboardStore: Store<AdminDashboardState>, private location: Location) {
  }


  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params.id;
    if (this.employeeId) {
      this.adminDashboardStore.select(selectEmployeeById, parseInt(this.employeeId)).subscribe((employee) => {
        this.employeeForm = this.generateEmployeeForm(employee);
      });
    }
    else {
      this.employeeForm = this.generateEmployeeForm();
    }

    this.projects$ = this.adminDashboardStore.pipe(select(selectProjects))
  }

  onSubmit(): void {
    if(this.employeeForm.valid) {
      if (this.employeeId) {
        this.adminDashboardStore.dispatch(updateEmployee(parseInt(this.employeeId), this.employeeForm.value, ));
      }
      else {
        this.adminDashboardStore.dispatch(addEmployee(this.employeeForm.value));
      }

      this.location.back();
    } 
    else {
      this.employeeForm.markAllAsTouched();
    }
  }

  private generateEmployeeForm(employee?: EmployeeDetailsViewModel): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl(employee ? employee.firstName : '', [Validators.required]),
      lastName: new FormControl(employee ? employee.lastName : '', [Validators.required]),
      workingOn: new FormControl(employee ? employee.workingOn : [])
    });
  }
}