import { Router } from "express";
import { currentUser, loginUser, logoutUser, registerUser } from "../controllers/session.controller.js";
import {authenticate,sessionActive} from "../middlewares/authentication.js";

const routerSession = Router();

routerSession.post("/register",sessionActive, registerUser);

routerSession.post("/login",sessionActive, loginUser);

routerSession.get("/logout",authenticate,logoutUser );

routerSession.get("/current",authenticate,currentUser)
routerSession.delete("/:uid",) 

export default routerSession;
