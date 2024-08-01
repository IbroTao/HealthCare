import {catcAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import {generateToken} from "../utils/jwtToken.js"

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
        generateToken(user, "User Registered!", 200, res)
});

export const loginPatient = catcAsyncErrors(async(req, res, next) =>  {
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide All Details", 400))
    }

    if(password !== confirmPassword) {
        return next(new ErrorHandler("Passwords Does Not Match", 400))
    }

    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return next(new ErrorHandler("Invalid Password Or Email!", 400))
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email Or Password", 400))
    }

    if(role !== user.role){
        return next(new ErrorHandler(`User With ${role} Role Not Found!`, 400))
    }

    generateToken(user, "User Logged In Successfully!", 200, res)
})

export const addAdmin = catcAsyncErrors(async(req, res, next) => {
    const {firstName, lastName, email, password, phone, gender, dob, nic} = req.body;
    if(!firstName || !lastName || !email || !password || !phone || !gender || !dob || !nic) {
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }

    const isRegistered = await User.findOne({email}).select("+password");
    if(isRegistered) {
        return next(new ErrorHandler(`${isRegistered} With This Email Already Exists!`, 400))
    };

    const admin = await User.create({
        firstName, lastName, email, password, phone, dob, gender, nic, role: "Admin"
    });

    res.status(200).json({
        success: true,
        message: "New Admin Registered!"
    })
})

export const getAllDoctors = catcAsyncErrors(async(req, res, next) => {
    const doctors = await User.findOne({role: "Doctor"});
    if(!doctors) {
        return next(new ErrorHandler("Doctors Not Found", 404))
    }

    res.status(200).json({
        success: true,
        doctors
    })
})