import express from "express";
import { sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post('/send', sendMessage);

export default router;