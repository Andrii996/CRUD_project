import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

const app = express();

app.get('/', (req, res) => {
  res.send('Hellow to you from server');
})

app.listen(PORT, () => {
  console.log('Server is running on http://localhost:3006');
})


