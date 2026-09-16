import { RedisClientType } from "redis";
import { UrlCache } from "../../domain/cache/cache.js";
import { Logger } from "../../domain/logger/logger.js";
import { RedisClient } from "./redisClient.js";
import { Redis } from "../../domain/response/redis.js";

export class RedisCache implements UrlCache{
    constructor(
        private readonly logger: Logger,
        private readonly client: RedisClientType
    ){}

    async set(shortCode: string, originalUrl: string): Promise<void> {
        this.client.set(shortCode, originalUrl);
    }

    async get(shortCode: string): Promise<Redis | null> {
        const url = await this.client.get(shortCode);

        if(!url) return null

        return {
            shortCode,
            originalUrl: url
        }
    }    
}