import express, {Express} from 'express';

import { errorHandler } from './presentation/http/middleware/errorHandler.js';
import urlRouter from './presentation/http/url/urlRoutes.js';

const app: Express = express();

app.use(express.json());

app.use("/api/v1/urls", urlRouter);
//app.use("/api/v1/analytics");

app.use(errorHandler);

export default app