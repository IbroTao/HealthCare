import express from "express";
import { addAdmin, getAllDoctors, loginPatient, registerPatient } from "../controllers/userController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

// POST ROUTES
router.post('/patient/register', registerPatient);
router.post('/login', loginPatient);
router.post('/admin/new', isAdminAuthenticated, addAdmin);

// GET ROUTES
router.get('/doctors', getAllDoctors);

export default router;