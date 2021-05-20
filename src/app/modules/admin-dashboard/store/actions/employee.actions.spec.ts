import * as fromEmployee from './employee.actions';

describe('loadEmployees', () => {
  it('should return an action', () => {
    expect(fromEmployee.loadEmployees().type).toBe('[Employee] Load Employees');
  });
});
