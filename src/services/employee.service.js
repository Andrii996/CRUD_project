import { Employee } from '../models/employee.js';

function findEmployee(data) {
  return Employee.findOne({
    name: data.name,
    surname: data.surname,
    email: data.email,
  });
}

async function addEmployee(data) {
  const existEmployee = await findEmployee(data);

  if (existEmployee) {
    return 'Employee already exists';
  }

  const employee = new Employee({
    email: data.email,
    name: data.name,
    surname: data.surname,
    department: data.department,
  });

  await employee.save();
}

export const employeeService = {
  findEmployee,
  addEmployee,
};
