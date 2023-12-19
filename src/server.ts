import mongoose from 'mongoose';
import config from './config';
import app from './app';

async function server() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('Connect to mongodb');
    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
server();
