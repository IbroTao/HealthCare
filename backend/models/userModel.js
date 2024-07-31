import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"] 
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"] 
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
        maxLength: [11, "Phone Number Must Contain Exact 11 Digits!"],
    },
    nic: {
        type: String,
        required: true,
        minLength: [13, "Phone Number Must Contain Exact 11 Digits!"],
        maxLength: [13, "Phone Number Must Contain Exact 11 Digits!"],
    },
    dob: {
        type: Date,
        required: [true, "DOB is required!"]
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    password: {
        type: String,
        required: true,
        minLength: [5, "Phone Number Must Contain At Least 5 Characters!"],
        maxLength: [8, "Phone Number Must Contain Exact 8 Characters!"],
    }
})

export const User = mongoose.model("User", userSchema)