import express from "express";
import { bookAppointment, getAllAppointments } from "../controllers/appointmentController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.get('/all', isAdminAuthenticated, getAllAppointments);
router.post('/book', isPatientAuthenticated, bookAppointment);

export default router;