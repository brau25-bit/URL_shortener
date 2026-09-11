import { UrlRepository } from "../domain/urlRepository/urlRepository.js";
import { Response } from "../domain/response/response.js";
import { ShortCodeGenerator } from "../domain/shortCodeGenerator/ShortCodeGenerator.js";
import { ShortCodeDomain } from "../domain/url/shortCodeDomain.js";


export class CreateShortUrl {
     
    constructor(
        private readonly repository: UrlRepository,
        private readonly codeGenerator: ShortCodeGenerator 
    ){}

    async execute(originalUrl: string): Promise<Response>{
        
        const shortCode: string =  this.codeGenerator.generate();

        new ShortCodeDomain(shortCode);

        const result = await this.repository.create(originalUrl, shortCode);
        
        return {
            status: 200,
            success: 'ok',
            response: result
        };
    }
}