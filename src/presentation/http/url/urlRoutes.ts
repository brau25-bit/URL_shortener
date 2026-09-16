import { Router } from "express";

import { controller } from "../../../config/container.js";

const urlRouter: Router = Router();

urlRouter.post("/", controller.createShortCode);

urlRouter.get("/:shortCode", controller.findByShortCode);

export default urlRouter;