import app from './app';
import mongoose from 'mongoose';

const start = async () => {
  if (!process.env.DB_URI) {
    throw new Error('DB_URI must be defined');
  }

  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
};

start();
