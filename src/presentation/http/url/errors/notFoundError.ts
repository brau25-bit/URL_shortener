
import { AppError } from "./AppError.js";

export class NotFoundError extends AppError{
    constructor(message: string = "Not found"){
        super(404, message)
    }
}