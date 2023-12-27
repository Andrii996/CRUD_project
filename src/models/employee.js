import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
      unique: true,
    },
    name: {
      required: true,
      type: String,
    },
    surname: {
      required: true,
      type: String,
    },
    department: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Employee = mongoose.model('Employee', employeeSchema);
