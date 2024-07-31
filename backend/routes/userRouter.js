import express from "express";
import { registerPatient } from "../controllers/userController";

const router = express.Router();

router.post('/patient/register', registerPatient)

export default router;