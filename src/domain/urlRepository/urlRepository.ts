import { Url } from "../url/URL.js";
import { ResponseUrl } from "../response/URL.js";

export interface UrlRepository {
    create(originalUrl: string, shortCode: string): Promise<ResponseUrl>;
    findByShortCode(shortCode: string): Promise<ResponseUrl | null>;
    delete(shortCode: string): Promise<void>; 
}