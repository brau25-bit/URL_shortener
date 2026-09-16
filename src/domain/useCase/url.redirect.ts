import { Response } from "../response/response.js";

export interface RedirectUrlCase {
    execute(shortCode: string): Promise<Response>
}