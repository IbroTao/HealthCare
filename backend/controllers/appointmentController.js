import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import {User} from "../models/userModel.js";
import {Appointment} from "../models/appointmentModel.js"

export const bookAppointment = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, dob, nic, gender, appointment_date, 
        department, doctor_firstName, doctor_lastName, address } = req.body;

    if (!firstName || !lastName || !email || !phone || !dob || !nic 
        || !gender || !appointment_date || !department || !doctor_firstName || !doctor_lastName || !address) {
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }

    const findScheduledAppt = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department
    });

    if (findScheduledAppt.length === 0) {
        return next(new ErrorHandler("Doctor Not Found!", 404));
    }

    if (findScheduledAppt.length > 1) {
        return next(new ErrorHandler("Doctors Conflict! Please Contact Hospital Through Email Or Phone!", 404));
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
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        doctorId,
        patientId,
        address,
        hasVisited: false
    });

    res.status(201).json({
        success: "true",
        message: "Appointment Booked Successfully!"
    });
});


export const getAllAppointments = catchAsyncErrors(async(req, res) => {
    const appointments = await Appointment.find();
    if(!appointments) {
        return next(new ErrorHandler("No Appointments Booked!", 404));
    }

    res.status(200).json({
        success: true,
        appointments
    })
});

export const updateAppointment = catchAsyncErrors(async(req, res) => {
    const {id} = req.params;
    const appointment = await Appointment.findByIdAndUpdate({id}, {
        new: true
    });
    if(!appointment) {
        return next(new ErrorHandler("Appointment Not Found!", 404))
    }
})

