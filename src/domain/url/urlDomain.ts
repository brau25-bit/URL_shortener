import { BadRequest } from "../../presentation/http/url/errors/badRequestError.js";

export class Url {
    constructor(private readonly originalUrl: string){
        if(!originalUrl || typeof originalUrl !== "string") throw new BadRequest();
        
        if(!originalUrl.startsWith("http")) throw new BadRequest("URL must start with http");        
    }
}