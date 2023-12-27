import passport from "passport";
import jwt from "jsonwebtoken";
import { validatePassword, createHash } from "../utils/bcrypt.js";
import {
  createUser,
  deleteUser,
  findUserByEmail,
  findUserById,
  lastConnectionUser,
} from "../services/userService.js";


export const loginUser = (req, res) => {
  // Utilizar passport.authenticate con la estrategia JWT para el inicio de sesión
  passport.authenticate("jwt", { session: false }, async (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: "Error durante el inicio de sesión" });
    }

    if (!user) {
      // Si el usuario no está autenticado con JWT, proceder a verificar las credenciales localmente
      const { email, password } = req.body;
      const userBDD = await findUserByEmail(email);

      if (!userBDD) {
        return res.status(401).send({ error: "Usuario no encontrado" });
      }

      if (!validatePassword(password, userBDD.password)) {
        return res.status(401).send({ error: "Contraseña inválida" });
      }

      // Generar token JWT
      console.log("false? ",req.cookies)
      lastConnectionUser(userBDD._id)
      const token = jwt.sign({ user: { id: userBDD._id } },"coder1234");
      // Devolver token al cliente
       res.cookie("jwt", token,{httpOnly:true})
       return res.status(200).send({status:"success",token:token});

      
        
    }
  })(req, res);
};




export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    if (!first_name || !last_name || !email || !age || !password) {
      return res.status(401).send({status:"error",message:"Faltan Campos por completar"});;
    }
    const userBDD = await findUserByEmail(email);
    if (userBDD) {
      return res.status(401).send({status:"error",message:"Usuario Existente"});
    } else {
      const hashPassword = createHash(password);
      const newUser = await createUser({
        first_name,
        last_name,
        email,
        age,
        password: hashPassword,
      });
      return res.status(200).send({status:"success",message:"Registro Exitoso"});
    }
  } catch (error) {
    return res.status(500).send(`Ocurrio un error en Registro User, ${error}`);
  }
};

export const logoutUser = async (req, res) => {
  try {
   if(req.cookies.jwt){
    console.log(req.user)
    lastConnectionUser(req.user._id)
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout exitoso" });
   }else{
    res.status(500).send(`No hay Sesion activa`)
   } 
  
  } catch (error) {
    res.status(500).send(`Ocurrio un error en Logout User, ${error}`);
  }
};

export const currentUser = async (req,res)=>{
  try{
    const user= await findUserById(req.user._id)
    if(user){
      res.status(200).send(user)
    }else{
      res.status(400).send({status:"error", message:"error al obtener usuarios", error:user})
    }
  }catch(error){
    res.status(500).send(`Error al obtener usuario, ${error}`)

  }
}
