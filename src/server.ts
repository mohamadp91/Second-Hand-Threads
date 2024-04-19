import Mongoose from 'mongoose';
import dotenv from 'dotenv';

import app from './app/app';

dotenv.config({
  path: `./src/config/config.env`,
});

const DB = process.env.DB || '';

Mongoose.connect(DB).then(() =>
  console.log('Database connected successfully!!'),
);

const baseUrl = process.env.BASE_URL || '127.0.0.1';
const port = Number.parseInt(
  process.env.PORT !== undefined ? process.env.PORT : '3000',
);

app.listen(port, baseUrl, () => {
  console.log('Server is running...');
});
