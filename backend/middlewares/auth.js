import {catcAsyncErrors} from "./catchAsyncErrors.js"
import ErrorHandler from "./errorMiddlewares.js"

export const isAdminAuthenticated = catcAsyncErrors(async(err, req, res, next) => {
    const token = req.cookies.adminToken;
    if(!token) {
        return next(new ErrorHandler)
    }
})