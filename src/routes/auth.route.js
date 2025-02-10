import express from "express";
import {signUp,getUser,getAllUsers,logout,signIn} from "../controllers/user.controller.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/signup",signUp)
router.post("/signin",signIn)
router.post("/logout",logout)
router.get("/user",auth,getUser);
router.get("/feed",getAllUsers);

export default router;