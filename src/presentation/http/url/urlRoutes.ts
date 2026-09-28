import { Router } from "express";

import { controller } from "../../../config/container.js";
import { middlewareLogger } from "../middleware/logger.js";
import { PinoLogger } from "../../../infrastructure/logger/logger.js";

const logger = new PinoLogger();

const urlRouter: Router = Router();

urlRouter.post("/",  middlewareLogger(logger), controller.createShortCode.bind(controller));

urlRouter.get("/health", controller.healthCheck)

urlRouter.get("/:shortCode", middlewareLogger(logger), controller.findByShortCode.bind(controller));

export default urlRouter;