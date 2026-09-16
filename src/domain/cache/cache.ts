import { Redis } from "../response/redis.js";

export interface UrlCache {
    set(shortCode: string, originalUrl: string): Promise<void>;

    get(shortCode: string): Promise<Redis | null>;
}