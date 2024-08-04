import mongoose from "mongoose";
import validator from "validator";
import {modelNames} from "../constants/modelNames.js"

const messageSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3, "First Name Must Contain At Least 3 Characters!"],
    },
    lastName:{
        type: String,
        required: true,
        minLength: [3, "Last Name Must Contain At Least 3 Characters!"],
    },
    email:{
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Provide A Valid Email!"],
        unique: true
    },
    phone:{
        type: String,
        required: true,
        minLength: [11, "Phone Number Must Contain Exact 11 Digits!"]
    },
    message:{
        type: String,
        required: true,
        minLength: [10, "Message Must Contain At Least 10 Characters!"],
    }
});

export const Message = mongoose.model(modelNames.message, messageSchema)