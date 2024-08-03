import {catchAsyncErrors} from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../middlewares/errorMiddlewares";
import {User} from "../models/userModel.js";
import {Appointment} from "../models/appointmentSchema.js"

export const postAppointment = catchAsyncErrors(async(req, res) => {
    const {firstName, lastName, email, phone, dob, 
        nic, hasVisited, gender, appointment_date, 
        department, doctor_firstName, doctor_lastName} 
    = req.body;

    if(firstName, lastName, email, phone, dob, 
        nic, hasVisited, gender, appointment_date, 
        department, doctor_firstName, doctor_lastName) {
            
        }
})