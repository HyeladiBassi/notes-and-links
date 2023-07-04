import { NextFunction, Request, Response } from "express";
import { HttpException, ApiResponse } from "../exceptions/HttpException";
import httpStatus from "http-status";
import { INTERNAL_SERVER_ERROR } from "../constants/fields";

export const ErrorMiddleWare = (error: HttpException, req: Request, response: Response, next: NextFunction) => {
    try {
        const status = error.status || httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || INTERNAL_SERVER_ERROR;
        const data: ApiResponse<HttpException> = {
            success: false,
            stack: error.stack,
            message: message
        }
        return response.status(status).json(data)
    } catch (error) {
        next(error)
    }
}