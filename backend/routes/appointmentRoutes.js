import express from "express";
import { bookAppointment, getAllAppointments } from "../controllers/appointmentController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post('/book', isPatientAuthenticated, bookAppointment);
router.get('/all', isAdminAuthenticated, getAllAppointments);

export default router;