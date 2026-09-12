import { AppError } from "./AppError.js";

export class RepositoryError extends AppError{
    constructor(statusCode: number=503, message: string="Service unavailable"){
        super(statusCode, message)
    }
}