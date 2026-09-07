import { Request, Response, NextFunction } from "express";

import {AppError} from '../url/errors/AppError.js'

export function errorHandler(
    err: unknown, req: Request, res: Response, next: NextFunction
){
    if(err instanceof AppError){
        res.status(err.statusCode).json(err.message);
    }

    res.status(500).json({
        message: "Internal Server Error"
    })
}