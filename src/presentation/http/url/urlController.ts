import { Request, Response, NextFunction } from "express";

import { CreateShortUrl } from "../../../application/createShortUrl.js";
import { CreateShortUrlCase } from "../../../domain/useCase/url.useCase.js";
import { RedirectUrlCase } from "../../../domain/useCase/url.redirect.js";
import { Logger } from "../../../domain/logger/logger.js";

export class UrlController {
    
    constructor(
        private readonly createShortUrl: CreateShortUrlCase,
        private readonly redirectUrl: RedirectUrlCase
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
            const {shortCode} = req.query;

            const result = await this.redirectUrl.execute(
                shortCode as string
            )

            res.redirect(301, result.response?.originalUrl!)
        } catch (error) {
            next(error)
        }
    }

    async healthCheck(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            res.status(200).json({
                healthCheck: 'ok'
            })
        } catch (error) {
            //next(error)
            console.log(error)
        }
    }
}