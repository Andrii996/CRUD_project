import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { Employee } from './models/employee.js';
import { Department } from './models/department.js';

const PORT = process.env.PORT || 3000;

const mongoString = process.env.DATABASE_URL;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://andrii996.github.io'],
  optionsSuccessStatus: 200,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

app.get('/', (req, res) => {
  res.send('Hellow to you from server');
});

app.get('/departments', async (req, res) => {
  const departments = await Department.find();

  res.send(departments);
});

app.get('/employees', async (req, res) => {
  const employees = await Employee.find();

  res.send(employees);
});

app.post('/employees', async (req, res) => {
  const { name, surname, email, department } = req.body;

  if (!name || !surname || !email || !department) {
    return res
      .status(400)
      .json({ message: 'Missing required fields in the request body' });
  }

  const existEmployee = await Employee.find({
    name: name,
    surname: surname,
    email: email,
  });

  if (existEmployee.length > 0) {
    return res.status(409).send({ message: 'User already exists' });
  }

  const departmentExists = await Department.findOne({ name: department });

  if (!departmentExists) {
    return res.status(404).send({ message: 'No such department' });
  }

  const newEmployee = new Employee({
    name,
    surname,
    email,
    department,
  });

  await newEmployee.save();

  const [savedEmployee] = await Employee.find({
    name: name,
    surname: surname,
    email: email,
  });

  res.status(201).send(savedEmployee);
});

app.patch('/employees', async (req, res) => {
  const { department, email, id } = req.body;

  if (!id || (!department && !email)) {
    return res
      .status(400)
      .json({ message: 'Missing required fields in the request body' });
  }

  const employee = await Employee.findOne({ _id: id });

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  if (department) {
    const departmentExists = await Department.findOne({
      department: department,
    });

    if (departmentExists) {
      return res.status(404).send({ message: 'No such department' });
    }

    employee.department = department;
  }

  if (email) {
    employee.email = email;
  }

  await employee.save();

  res.status(200).json(await Employee.findOne({ _id: id }));
});

app.delete('/employees', async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: 'Missing id in the request body' });
  }

  const deletedEmployee = await Employee.findOneAndDelete({ _id: id });

  if (!deletedEmployee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  res
    .status(200)
    .json({ message: 'Employee deleted successfully', deletedEmployee });
});

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3006');
});
