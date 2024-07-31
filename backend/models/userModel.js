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
    }
})

export const User = mongoose.model("User", userSchema)