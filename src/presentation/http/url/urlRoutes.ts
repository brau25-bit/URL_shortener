import { Router } from "express";

import { controller } from "../../../config/container.js";

const urlRouter: Router = Router();

urlRouter.post("/", controller.createShortCode);

//urlRouter.get("/:short-code");

export default urlRouter;