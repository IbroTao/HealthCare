import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";
import {generateToken} from "../utils/jwtToken.js";
import {MESSAGES} from "../constants/responsesMessages.js";
import {allowedFormats} from "../constants/imageFormats.js";
import cloudinary from "cloudinary";

export const registerPatient = catchAsyncErrors(async(req, res, next) => {
        const {firstName, lastName, phone, email, password, dob, nic, gender, role} = req.body;
        const fields = {
            firstName: 'First name is required',
            lastName: 'Last name is required',
            phone: 'Phone number is required',
            email: 'Email is required',
            password: 'Password is required',
            dob: 'Date of birth is required',
            nic: 'NIC is required',
            gender: 'Gender is required',
            role: 'Role is required'
        };
        
        for (const [field, message] of Object.entries(fields)) {
            if (!req.body[field]) {
                return next(new ErrorHandler(message, 400));
            }
        }
        
        // Continue with the rest of the code if all fields are filled        
    
        let user = await User.findOne({email});
        if(user) {
            return next(new ErrorHandler("Email Already Taken!", 400))
        } 
    
        user = await User.create({
            firstName,
            lastName,
            email,
            dob,
            password,
            nic,
            gender,
            phone,
            role: "Patient"
        });
        generateToken(user, MESSAGES.SUCCESS, 201, res)
});

export const loginPatient = catchAsyncErrors(async(req, res, next) =>  {
    const {email, password, confirmPassword, role} = req.body;
    if(!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler(MESSAGES.FILL_FULL_FORM, 400))
    }

    if(password !== confirmPassword) {
        return next(new ErrorHandler(MESSAGES.PASSWORD_NO_MATCH, 400))
    }

    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return next(new ErrorHandler(MESSAGES.INVALID_DETAILS, 400))
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
        return next(new ErrorHandler(MESSAGES.INVALID_DETAILS, 400))
    }

    if(role !== user.role){
        return next(new ErrorHandler(`User With ${role} Role Not Found!`, 400))
    }

    generateToken(user, `${user.role} ${MESSAGES.LOGGED_IN}!`, 200, res)
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
        return next(new ErrorHandler(MESSAGES.PROVIDE_IMAGE, 400));
    }
    
    const { docAvatar } = req.files;
    // Check file format
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler(MESSAGES.WRONG_FILE_FORMAT, 400));
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
        return next(new ErrorHandler(`${isRegistered.role} ${MESSAGES.EMAIL_TAKEN}`, 400));
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await cloudinary.v2.uploader.upload(docAvatar.tempFilePath);
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error:", cloudinaryResponse.error || "Unknown Cloudinary Error");
        return next(new ErrorHandler("Cloudinary Upload Failed", 500));
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

    generateToken(doctor, `${doctor.role} ${MESSAGES.SUCCESS}`, 201, res)
});


