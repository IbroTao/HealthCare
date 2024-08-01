import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import {generateToken} from "../utils/jwtToken.js"

export const registerPatient = catchAsyncErrors(async(req, res, next) => {
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

export const loginPatient = catchAsyncErrors(async(req, res, next) =>  {
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

export const addAdmin = catchAsyncErrors(async(req, res, next) => {
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

export const getAllDoctors = catchAsyncErrors(async(req, res, next) => {
    const doctors = await User.findOne({role: "Doctor"});
    if(!doctors) {
        return next(new ErrorHandler("Doctors Not Found", 404))
    }

    res.status(200).json({
        success: true,
        doctors
    })
})

export const getUserDetails = catchAsyncErrors(async(req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })
});

export const logoutAdmin = catchAsyncErrors(async(req, res, next) => {
    res.status(204).cookie("adminToken", "", {
        httpOnly: true,
        expiresIn: new Date(Date.now()) 
    }).json({
        success: true,
        message: "Admin Logged Out Successfully"
    })
});

export const logoutPatient = catchAsyncErrors(async(req, res, next) => {
    res.status(204).cookie("patientToken", "", {
        httpOnly: true,
        expiresIn: new Date(Date.now())
    }).json({
        success: true,
        message: "Patient logged In"
    })
})

export const addNewDoctor = catchAsyncErrors(async(req, res, next) => {
    if(!req.files || !Object.keys(req.files).length === 0){
        return next(new ErrorHandler("Doctor Avatar Required!", 400))
    }
    const {docAvatar} = req.files;
    const allowedFormats = ["/image/png", "/image/jpeg", "/image/webp"];
    if(!allowedFormats.includes(docAvatar.mimetype)){
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }

    const {firstName, lastName, email, password, phone, gender, dob, nic, doctorDepartment} = req.body;
    if(!firstName || !lastName || !email || !password || !phone || !gender || !dob || !nic || !doctorDepartment) {
        return next(new ErrorHandler("Please Fill Full Form!", 400))
    };

    const isRegistered = await User.findOne({email});
    if(isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400))
    }
})

