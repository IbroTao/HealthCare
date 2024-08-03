import { Message } from "../models/messageModel.js";
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/errorMiddlewares.js"

export const sendMessage = catchAsyncErrors(async(req, res, next) => {
    try{
        const {firstName, lastName, email, phone, message} = req.body;
        if(!firstName || !lastName || !email || !phone || !message) {
            return next(new ErrorHandler("Please Fill Full Form!", 400))
        }
        await Message.create({firstName, lastName, email, phone, message});
        res.status(200).json({
            success: true,
            message: "Message Send Successful"
        })  
    }
    catch(err){
        res.status(500).json({err})
    }
})

export const getAllMessages = catchAsyncErrors(async(req, res) => {
    const messages = await Message.find({});
    if(!messages) {
        return next(new ErrorHandler("No Messages Found!", 404))
    }
    res.status(200).json({
        success: true,
        messages
    })
})

export const getSingleMessage = catchAsyncErrors(async(req, res) => {
    
})