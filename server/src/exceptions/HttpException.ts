export class HttpException extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this)
    }
}

export interface ApiResponse<T> {
    success: boolean
    data?: T,
    message?: string,
    stack?: unknown
}