import { Response } from "../response/response.js";

export interface CreateShortUrlCase {
    execute(originalUrl: string): Promise<Response>;
}