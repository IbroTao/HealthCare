import {catcAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";

export const registerPatient = catcAsyncErrors(async(req, res, next) => {
        const {firstName, lastName, phone, email, password, dob, nic, role, gender} = req.body;
        if(!firstName || !lastName || !phone || !email || !password || !dob || !nic || !role || !gender) {
            return next(new ErrorHandler("Please Fill Full Form", 400))
        }
    
        let user = await User.findOne({email});
        if(user) {
            return next(new ErrorHandler("User Already Registered!", 400))
        } 
    
        user = await User.create({
            firstName,
            lastName,
            email,
            dob,
            password,
            nic,
            role,
            gender,
            phone
        });
        res.status(200).json({
            success: true,
            message: "User registered!",
        }) 
});

export const loginPatient = catcAsyncErrors(async(req, res, next) =>  {
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role) {
        return next(ErrorHandler("Please Provide All Details", 400))
    }

    if(password !== confirmPassword) {
        return next(ErrorHandler("Passwords Does Not Match", 400))
    }
})