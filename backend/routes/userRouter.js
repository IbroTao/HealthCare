import express from "express";
import { loginPatient, registerPatient } from "../controllers/userController.js";

const router = express.Router();

router.post('/patient/register', registerPatient);
router.post('/patient/login', loginPatient)

export default router;