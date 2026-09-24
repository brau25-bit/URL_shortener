import { ResponseUrl } from "./URL.js";
import { Redis } from "./redis.js";

export type Response = {
    status: number,
    success: string,
    response: ResponseUrl | Redis | null
}