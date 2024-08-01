import express from "express";
import { addAdmin, getAllDoctors, getUserDetails, loginPatient, logoutAdmin, logoutPatient, registerPatient } from "../controllers/userController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

// POST ROUTES
router.post('/patient/new', registerPatient);
router.post('/login', loginPatient);
router.post('/admin/new', isAdminAuthenticated, addAdmin);
router.post('/doctor/new', )

// GET ROUTES
router.get('/doctors', getAllDoctors);
router.get('/admin/user-details', isAdminAuthenticated, getUserDetails);
router.get('/patient/details', isPatientAuthenticated, getUserDetails);
router.get('/admin/logout', isAdminAuthenticated, logoutAdmin);
router.get('/patient/logout', isPatientAuthenticated, logoutPatient);

export default router;