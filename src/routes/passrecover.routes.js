import { Router } from "express";
import {sendMail,verifyToken,newPassword} from "../controllers/passRecover.controller.js"
const routerPassRecover = Router()


routerPassRecover.get("/", (req,res) =>{
    res.render("passRecover")
})

routerPassRecover.post("/",sendMail,(req,res) =>{
    res.render("sendMail")
})

routerPassRecover.get("/:token",verifyToken,(req,res)=>{
    const token=req.params.token
    res.render("newPassword",{token})
})
routerPassRecover.post("/:token",verifyToken,newPassword,(req,res)=>{
    res.redirect("http://localhost:8080/api/session/login/")
})

export default routerPassRecover