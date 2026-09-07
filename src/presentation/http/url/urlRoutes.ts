import { Router } from "express";

import { urlController } from "../../../config/container.js";

const urlRouter: Router = Router();

urlRouter.post("/", urlController.createShortCode);

urlRouter.get("/:short-code");

export default urlRouter;