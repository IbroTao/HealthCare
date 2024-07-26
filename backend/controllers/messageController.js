import { Message } from "../models/messageModel.js";

export const sendMessage = async(req, res, next) => {
    try{
        const {firstName, lastName, email, phone, message} = req.body;
        if(!firstName || !lastName || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "Please Fill Full Form"
            });
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
}