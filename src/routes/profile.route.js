import express from "express";
import auth from "../middlewares/auth.js";
import { getById,editProfile } from "../controllers/user.controller.js";
const Router = express.Router();

Router.get("/view",auth,getById);
Router.patch("/edit",auth,editProfile)


export default Router;