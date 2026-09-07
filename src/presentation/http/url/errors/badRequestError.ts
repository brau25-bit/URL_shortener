import { AppError } from "./AppError.js"

export class BadRequest extends AppError{
    constructor(message: string = "Invalid request"){
        super(400, message)
    }
}