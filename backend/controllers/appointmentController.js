import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import {User} from "../models/userModel.js";
import {Appointment} from "../models/appointmentModel.js"

export const bookAppointment = catchAsyncErrors(async(req, res) => {
    const {firstName, lastName, email, phone, dob, 
        nic, hasVisited, gender, appointment_date, 
        department, doctor_firstName, doctor_lastName} 
    = req.body;

    if(!firstName 
        || !lastName 
        || !email 
        || !phone 
        || !dob 
        || !nic 
        || !hasVisited 
        || !gender 
        || !appointment_date 
        || !department 
        || !doctor_firstName 
        || !doctor_lastName
    ) {
        return next(new ErrorHandler("Please Fill Full Form", 400))
    }

    const findScheduledAppt = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department
    });

    if(findScheduledAppt.length === 0) {
        return next(new ErrorHandler("Doctor Not Found!", 404))
    }
    if(findScheduledAppt > 1) {
        return next(new ErrorHandler("Doctors Conflict! Please Contact Hospital Through Email Or Phone!", 404))
    }

    const doctorId = findScheduledAppt[0]._id;
    const patientId = req.user._id;

    const appointment = await Appointment.create({
        firstName, 
        lastName, 
        email, 
        phone, 
        dob, 
        nic, 
        hasVisited, 
        gender, 
        appointment_date, 
        department, 
        doctor: {
            firstName: doctor_firstName, 
            lastName: doctor_lastName,
        },
        doctorId, 
        patientId
    });

    res.status(201).json({
        success: "true",
        message: "Appointment Boooked Successfully!"
    })
}) 
