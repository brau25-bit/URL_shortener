import { ResponseUrl } from "./URL.js"

export type Response = {
    status: number,
    success: string,
    response: ResponseUrl | null
}