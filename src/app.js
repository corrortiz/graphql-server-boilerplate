import envConfig from './config/config.js';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

//ENV loadign
envConfig();
//DB Config
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true }
);

const app = express();
app.use(bodyParser.json(), cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));

export default app;
