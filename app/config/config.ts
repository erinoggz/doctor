import { config } from 'dotenv';
config();

const configuration = {
  appname: 'doctor',
  mongo: {
    uri: process.env.DATABASE,
  },
  web: {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT) || 7778,
  },
};

export default configuration;
