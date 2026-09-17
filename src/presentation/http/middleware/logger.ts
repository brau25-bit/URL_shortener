import { Request, Response, NextFunction } from "express";
import { Logger } from "../../../domain/logger/logger.js";
import { RequestLog } from "../../../domain/log/requestLog.js";

export function middlewareLogger(logger: Logger){
    return (req: Request, res: Response, next: NextFunction) => {
        const start = Date.now();

        const requesData: RequestLog = {
            method: req.method,
            path: req.path
        };

        if(Object.keys(req.body).length > 0) requesData.body = req.body;
        
        if(Object.keys(req.query).length > 0) requesData.query = req.query;

        if(Object.keys(req.params).length > 0) requesData.params = req.params

        logger.info("Request received", requesData);

        res.on('finish', () => {
            const durationMs = Date.now() - start;

            logger.info('Request completed', {
                method: req.method,
                path: req.path,
                statusCode: res.statusCode,
                durationMs
            });
        });
        
        next();
    }
}