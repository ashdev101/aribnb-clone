import mongoose from 'mongoose';

export async function connectDB() {
  try {
    if(!process.env.MONGO_URI) return console.log('no connection string make sure there is...')
    // by saying ! i say that i know what i am doing it will alaways happen 
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    })

    connection.on('error', (err) => {
      console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
      process.exit();
    })

  } catch (error) {
    console.log('Something goes wrong!');
    console.log(error);

  }


}