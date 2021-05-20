import { createAction } from '@ngrx/store';
import { EmployeeBindingModel } from '../../models/employee-models/binding-models/employee-binding.model';

export const addEmployee = createAction(
  '[Employee] Add Employee',
  (employee: EmployeeBindingModel) => ({employee})
);

export const deleteEmployee = createAction(
  '[Employee] Delete Employee',
  (employeeId: number) => ({employeeId})
);

export const updateEmployee = createAction(
  '[Employee] Update Employee',
  (employeeId: number , employee: EmployeeBindingModel) => ({employeeId, employee})
);