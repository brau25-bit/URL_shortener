import { BadRequest } from "../../presentation/http/url/errors/badRequestError.js";

export class OriginalUrlDomain{
    constructor(private readonly originalUrl: string){
        if(!originalUrl || typeof originalUrl !== 'string' || !originalUrl.startsWith('http')) throw new BadRequest();
    }
}