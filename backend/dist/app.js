import express from 'express';
const app = express();
import { config } from 'dotenv';
import morgan from 'morgan';
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
app.use(express.json());
config();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan('dev'));
app.use("/api/v1/", appRouter);
export default app;
//# sourceMappingURL=app.js.map