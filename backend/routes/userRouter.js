import express from "express";
import { addAdmin, loginPatient, registerPatient } from "../controllers/userController.js";

const router = express.Router();

router.post('/patient/register', registerPatient);
router.post('/patient/login', loginPatient);
router.post('/admin/new', addAdmin);

export default router;