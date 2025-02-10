import express from "express";
import auth from "../middlewares/auth";
import { getRequestsData,getConnections } from "../controllers/user.controller";
const Router = express.Router();

Router.get("/user/request/received",auth,getRequestsData);
Router.get("/user/connections",auth,getConnections);

export default Router;