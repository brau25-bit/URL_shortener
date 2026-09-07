import express, {Express} from 'express';

import { errorHandler } from './presentation/http/middleware/errorHandler.js';

const app: Express = express();

app.use(express.json());

app.use("/api/v1/urls");
//app.use("/api/v1/analytics");

app.use(errorHandler);

export default app