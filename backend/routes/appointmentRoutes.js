import express from "express";
import { bookAppointment } from "../controllers/appointmentController";
import {isPatientAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post('/book', isPatientAuthenticated, bookAppointment)

export default router;