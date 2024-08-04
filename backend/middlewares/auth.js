import {User} from "../models/userModel.js"
import {catchAsyncErrors} from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddlewares.js";
import jwt from "jsonwebtoken"

export const isAdminAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.adminToken;
    if(!token) {
        return next(new ErrorHandler("Admin Not Authenticated!", 400))
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedToken.id);
    
    if(req.user.role !== "Admin") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`))
    }
    next();
})

export const isPatientAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.patientToken;
    if(!token) {
        return next(new ErrorHandler("Patient Not Authenticated!", 400))
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decodedToken.id);

    if(!req.user) {
        return next(new ErrorHandler(""))
    }
    
    if(req.user.role !== "Patient") {
        return next(new ErrorHandler(`${req.user.role} not authorized for this resources!`))
    }
    next();
})
