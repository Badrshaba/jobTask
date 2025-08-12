import mongoose from 'mongoose';

const db_connection = async () => {
  await mongoose
    .connect(process.env.CONNECTION_URL_HOST as string)
    .then(() => console.log(`db connected successfully`))
    .catch((err) => console.log(`db connection failed`, err));
};

export default db_connection;
