import { BadRequest } from "../../presentation/http/url/errors/badRequestError.js"; 

export class ShortCodeDomain{

    constructor(private readonly shortCode: string){
        if(!shortCode || typeof shortCode !== "string") throw new BadRequest();
    }
}