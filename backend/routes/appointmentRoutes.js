import express from "express";
import { bookAppointment, getAllAppointments, updateAppointment, updateAppointmentStatus } from "../controllers/appointmentController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.get('/all', isAdminAuthenticated, getAllAppointments);
router.post('/book', isPatientAuthenticated, bookAppointment)
router.put('/doctor/update/status/:id', isAdminAuthenticated, updateAppointmentStatus);;
router.put('/patient/update/:id', isPatientAuthenticated, updateAppointment)

export default router;  