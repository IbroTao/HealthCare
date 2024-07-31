import {catcAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { User } from "../models/userModel.js";

export const registerPatient = catcAsyncErrors(async(err, req, res) => {
    const {firstName, lastName, phone, email, password, dob, nic, role, gender} = req.body;
    if(!firstName || !lastName || !phone || !email || !password || !dob || !nic || role || !gender) {
        return next(new ErrorHandler("Please Fill Full Form", 400))
    }

    const user = await User.findOne({email});
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
        gender
    })
})