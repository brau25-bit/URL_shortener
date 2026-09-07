import { Request, Response, NextFunction } from "express";

import { CreateShortUrl } from "../../../application/createShortUrl.js";

export class UrlController {
    
    constructor(
        private readonly createShortUrl: CreateShortUrl
    ){}

    async createShortCode(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const result = await this.createShortUrl.execute(req.body)

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