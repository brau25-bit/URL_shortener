import { UrlRepository } from "../domain/urlRepository/urlRepository.js";
import { UrlCache } from "../domain/cache/cache.js";
import { Response } from "../domain/response/response.js";
import { ShortCodeDomain } from "../domain/url/shortCodeDomain.js";
import { RedirectUrlCase } from "../domain/useCase/url.redirect.js";
import { OriginalUrlDomain } from "../domain/url/originalUrl.js";
import { NotFoundError } from "../presentation/http/url/errors/notFoundError.js";
import { Logger } from "../domain/logger/logger.js";

export class RedirectUrl implements RedirectUrlCase{
    constructor(
        private readonly repository: UrlRepository,
        private readonly cache: UrlCache,  
        private readonly logger: Logger
    ){}

    async execute(shortCode: string): Promise<Response>{
        new ShortCodeDomain(shortCode);

        try {
            const cacheResult = await this.cache.get(shortCode);

            if(cacheResult) return {
                status: 200,
                success: 'ok',
                response: cacheResult
            }
        } catch (error) {
            this.logger.warn("Cache unavailable", {
                shortCode: shortCode,
                error
            });
        } 

        const shortCodeResult = await this.repository.findByShortCode(shortCode);

        if(!shortCodeResult) throw new NotFoundError(); 

        new OriginalUrlDomain(shortCodeResult.originalUrl);

        try {
            await this.cache.set(shortCode, shortCodeResult.originalUrl);
        } catch (error) {
            this.logger.warn("Cache unavailable", {
                shortCode: shortCode,
                error
            });
        }

        return {
            status: 200,
            success: 'ok',
            response: shortCodeResult
        }
    }
}