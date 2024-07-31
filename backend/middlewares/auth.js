
import {catcAsyncErrors} from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddlewares.js";
import jwt from "jsonwebtoken"

export const isAdminAuthenticated = catcAsyncErrors(async(err, req, res, next) => {
    const token = req.cookies.adminToken;
    if(!token) {
        return next(new ErrorHandler("Admin Not Authenticated!", 400))
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User
})