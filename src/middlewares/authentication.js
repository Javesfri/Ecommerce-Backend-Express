import passport from "passport";

export const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Error en la autenticación" });
    }

    if (!user) {
      console.log(user)
      return res.status(401).json({ error: "No autorizado" });
    }

    req.user = user; 
    next();
  })(req, res, next);
};

export const rolVerify= (userRol)=>{
  return (req,res,next)=>{
    if(!req.user){
      return res.status(403).send({error: "No autorizado"})
    }
    if(userRol!==req.user.rol){
      return res.status(403).send({error:"No tiene permisos necesarios"})
    }
    next()
  }
  
}
export const sessionActive = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
  
    if (user) {
      console.log(req.cookies)
      return res.status(403).send({ error: "Usted ya está autenticado",message:"Redirigiendo al inicio" });
    }
    next();
  })(req, res, next);
};
