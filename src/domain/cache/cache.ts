import { ResponseUrl } from "../response/URL.js"

export interface UrlCache {
    set(shortCode: string): Promise<void>;

    get(shortCode: string): Promise<ResponseUrl | null>;
}