import { findUserById, findUsers } from "../services/userService.js";

export const getUsers = async (req, res) => {
  try {
    const users = await findUsers();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const setPremium = async (req, res) => {
  try {
    const user = await findUserById(req.params.uid);
    if(user){
      const requiredDocs=["identificacion","comprobante de domicilio", "comprobante de estado de cuenta"];
      const userDocs= user.documents.map(doc => doc.name.toLowerCase());
      const hasRequiredDocs= requiredDocs.filter(doc => userDocs.some(docName => docName.includes(doc)))
      if(hasRequiredDocs.length==3){
        user.rol= "Premium"
        await user.save()
        res.status(200).send({ message: "Usuario actualizado a premium" });
      }
      else{
        res.status(400).send({ message: "El usuario no ha cargado los tres documentos requeridos" });
      }
    }
    else{
      res.status(404).send({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};



