import { Request, Response, NextFunction } from "express";

import { CreateShortUrl } from "../../../application/createShortUrl.js";
import { CreateShortUrlCase } from "../../../domain/useCase/url.useCase.js";

export class UrlController {
    
    constructor(
        private readonly createShortUrl: CreateShortUrlCase
    ){}

    async createShortCode(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const result = await this.createShortUrl.execute(
                req.body.originalUrl
            );

            res.status(result.status).json({
                success: result.success,
                response: result.response
            })
        } catch (error) {
            next(error)
        }
    }

    async findByShortCode(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            
        } catch (error) {
            next(error)
        }
    }
}