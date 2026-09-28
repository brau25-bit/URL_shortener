import { Request, Response, NextFunction } from "express";

import {AppError} from '../url/errors/AppError.js';
import { Logger } from "../../../domain/logger/logger.js";

export function errorHandler(logger: Logger){
    return (
        err: unknown, req: Request, res: Response, next: NextFunction
    ) => {
        if(err instanceof AppError){
            logger.warn(err.message, err);

            return res.status(err.statusCode).json({
                message: err.message
            });
        }

        logger.error("Internal Server Error", {err});
        
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}