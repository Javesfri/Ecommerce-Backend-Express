import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"
import {findUserByEmail} from "../services/userService.js"
import { validatePassword, createHash} from "../utils/bcrypt.js";
const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "javesfri@gmail.com",
    pass: "tnaqjmhqhvdqbmul",
  },
});

export const sendMail = async (req, res,next) => {
  const email=req.body.mail
  if(await findUserByEmail(email)){
    const token=jwt.sign({email}, "pepe123",{expiresIn: "1h"})
    let result = await transport.sendMail({
      from: "advinka32@yahoo",
      to: `${email}`,
      subject: "Restablecimiento de contraseña",
      html: `<div><h3>Haz click en el botón para ir al enlace de restablecimiento de contraseñas,</h3><a href="http://localhost:8080/passRecovery/${token}">Restablecer contraseña</a></div>`,
      attachments: [],
    });
    if(result){
      req.logger.info("Mail Enviado Con exito")
    }
    else{
      req.logger.error("Error:El mail no  es GMAIL, O Error Desconocido")
    }
  }
  else{
    req.logger.error("Error: Mail no existente")
  }
  next()
};

export const verifyToken = (req,res,next) =>{
  const {token} =req.params;
  jwt.verify(token, "pepe123", (error,decoded)=>{
    if(error){
      req.logger.error("Error en Token:", error)
      res.redirect("http://localhost:8080/")
    }
    else{
      next();
    }
  })

}

export const newPassword =async (req,res,next) =>{
const {token}=req.params;
jwt.verify(token,"pepe123",async (error,decoded)=>{
  if(error){
    req.logger.error("Error en Token:", error)
    res.redirect("http://localhost:8080/")
  }
  else{
    const {pass1,pass2}=req.body
    const {email} =decoded;
    const user= await findUserByEmail(email)
    if(pass1===pass2){
      if(validatePassword(pass1,user.password)){
        req.logger.error("Error: No puede utilizar contraseñas antiguas")
        res.redirect(`/passRecovery/${token}`)
      }else{
        let newPass=createHash(pass1)
        user.password=newPass;
        let save= user.save()
        if(save){
          req.logger.info("Contraseña actualizada")
          next()
        }else{
          req.logger.error("Error al guardar la nueva contraseña")
        }
      }
    }
    else{
      req.logger.error("Las Contraseñas no coinciden")
      res.redirect(`/passRecovery/${token}`)
    }
    
  }
})
}
