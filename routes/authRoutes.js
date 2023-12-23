import express from "express";
import { login, register, update } from "../controllers/authController.js";
import { auth as authenticateUser, checkForTestUser } from "../middleware/auth.js";
import upload from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.route("/login").post(login);
router.route("/update").patch(authenticateUser, checkForTestUser, upload.single('avatar'), update);

export default router;