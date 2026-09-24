import { Response } from "../../../../src/domain/response/response";
import { ResponseUrl } from "../../../../src/domain/response/URL";
import { Redis } from "../../../../src/domain/response/redis";

const urlResponse: ResponseUrl = {
    id: "abcabkbad",
    originalUrl: 'http://google.com',
    shortCode: 'jbha3da',
    createdAt: new Date()
}

const cache: Redis = {
    originalUrl: 'http://google.com',
    shortCode: 'jbha3da',
}

const repoRes: Response = {
    status: 200,
    success: 'ok', 
    response: urlResponse
}

const cacheRes: Response = {
    status: 200,
    success: 'ok', 
    response: cache
}

const badUrl = {
    id: "abcabkbad",
    originalUrl: 'www.google.com',
    shortCode: 'jbha3da',
    createdAt: new Date()
} 

export {repoRes, cacheRes, urlResponse, cache, badUrl}