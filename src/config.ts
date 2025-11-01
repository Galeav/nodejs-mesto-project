import 'dotenv/config';

const config = {
  port: Number(process.env.PORT || 3000),
  mongodbUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/mestodb',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  jwtExpiresInDays: Number(process.env.JWT_EXPIRES_IN_DAYS || 7),
};

export default config;
