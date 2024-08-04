import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import {generateToken} from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const registerPatient = catchAsyncErrors(async(req, res, next) => {
        const {firstName, lastName, phone, email, password, dob, nic, role, gender} = req.body;
        if(!firstName || !lastName || !phone || !email || !password || !dob || !nic || !role || !gender) {
            return next(new ErrorHandler("Please Fill Full Form", 400))
        }
    
        let user = await User.findOne({email});
        if(user) {
            return next(new ErrorHandler("User Already Registered(Email Already Taken)!", 400))
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
        generateToken(user, "User Registered!", 201, res)
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

    generateToken(user, `${user.role} Logged In Successfully!`, 200, res)
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

    generateToken(admin, `${admin.role} Created Successfully!`, 201, res)
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
    if(!user) {
        return next(new ErrorHandler("User Not Found!", 404))
    }
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
        message: "Patient Logged Out Successfully!"
    })
});

export const logoutDoctor = catchAsyncErrors(async(req, res, next) => {
    res.status(204).cookie("doctorToken", "", {
        httpOnly: true,
        expiresIn: new Date(Date.now())
    }).json({
        success: true,
        message: "Doctor Logged Out Successfully!"
    })
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    // Check if files were uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required!", 400));
    }
    
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
    
    // Check file format
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }

    const { firstName, lastName, email, password, phone, gender, dob, nic, doctorDepartment } = req.body;

    // Check for missing fields
    if (!firstName) return next(new ErrorHandler("First name is required", 400));
    if (!lastName) return next(new ErrorHandler("Last name is required", 400));
    if (!email) return next(new ErrorHandler("Email is required", 400));
    if (!password) return next(new ErrorHandler("Password is required", 400));
    if (!phone) return next(new ErrorHandler("Phone number is required", 400));
    if (!gender) return next(new ErrorHandler("Gender is required", 400));
    if (!dob) return next(new ErrorHandler("Date of birth is required", 400));
    if (!nic) return next(new ErrorHandler("NIC is required", 400));
    if (!doctorDepartment) return next(new ErrorHandler("Doctor department is required", 400));

    // Check if user is already registered
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registered with this email`, 400));
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(docAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
        return next(new ErrorHandler("Cloudinary upload failed", 500));
    }

    // Create new doctor
    const doctor = await User.create({
        firstName,
        lastName,
        password,
        email,
        phone,
        dob,
        nic,
        doctorDepartment,
        gender,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        }
    });

    generateToken(doctor, `${doctor.role} Logged In Successfully!`, 201, res)
});


