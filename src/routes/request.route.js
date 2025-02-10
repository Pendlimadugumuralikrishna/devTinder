import express from "express";
import { makeRequest,viewRequest } from "../controllers/request.controller.js";
import auth from "../middlewares/auth.js";
const Router = express.Router();

Router.post("/send/:status/:toUserId", auth,makeRequest);
Router.post("/review/:status/:requestId",auth,viewRequest);

export default Router;