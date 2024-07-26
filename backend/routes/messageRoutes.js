import express from "express";
import { sendMessage } from "../controllers/messageController";

const router = express.Router();

router.post('/send', sendMessage);

export default router;