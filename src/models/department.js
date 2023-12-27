import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Department = mongoose.model('Department', departmentSchema);
