import 'dotenv/config';

const config = {
  port: Number(process.env.PORT || 3000),
  mongodbUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/mestodb',
};

export default config;
