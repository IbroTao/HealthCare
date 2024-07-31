import express from "express";
import { addAdmin, loginPatient, registerPatient } from "../controllers/userController.js";
import {isAdminAuthenticated, isPatientAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post('/patient/register', registerPatient);
router.post('/login', loginPatient);
router.post('/admin/new', isAdminAuthenticated, addAdmin);

export default router;