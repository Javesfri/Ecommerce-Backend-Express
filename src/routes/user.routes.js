import {getUsers, setPremium} from "../controllers/user.controller.js"
import { Router } from "express";
import uploader from "../utils/uploader.js";
import { updateDocumentsUser } from "../services/userService.js";
import { authenticate, rolVerify } from "../middlewares/authentication.js";



const routerUser = Router();


routerUser.get("/",authenticate,rolVerify("Admin"), getUsers)

routerUser.post("/:uid/documents/",authenticate, uploader.any(),async (req,res)=>{
    if(req.files){
        console.log("archivos subidos con exito")
        console.log(req.files)
        const docs=req.files.map(file =>{
            return{
                name: file.filename,
                reference: file.path
            }
        })
       let upload= await updateDocumentsUser(req.params.uid,docs)
       if(upload){
        res.status(200).send({message:"exito al subir archivos"})
       }else{
        res.status(400).send({error:"Error al subir archivos a la bbd"})
       }
    }else{
        console.log("Error al subir archivos")
        res.status(400).send({error:"Error al subir archivos"})
    }
    
})



export default routerUser
