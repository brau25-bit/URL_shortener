import { createClient, type RedisClientType } from "redis";
import { Logger } from "../../domain/logger/logger.js";

export class RedisClient {
    private readonly client: RedisClientType
    
    constructor(
        private readonly logger: Logger 
    ){
        this.client = createClient();
    }

    async connect(): Promise<RedisClientType>{
        try {
            await this.client.connect();

            this.logger.info("Redis connected");

            return this.client;
        } catch (error) {
            this.logger.error("Redis connection failed", {error: error});

            throw error;
        }
    }
}