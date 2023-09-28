import express from "express";

import { signupUser } from "../controller/signupUser.js";

const router = express.Router();

router.post("/signup", signupUser);

export default router;
