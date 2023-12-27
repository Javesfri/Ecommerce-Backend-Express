import userModel from "../models/MongoDB/userModel.js";
import { createCart,deleteCart } from "./cartService.js";

export const findUsers = async () => {
    try{
        const users = await userModel.find()
        return users
    }catch(error){
        throw error
    }
}

export const findUserById = async (id)=>{
    try{
        const user= await userModel.findById(id)
        return user
    }catch(error){
        throw error
    }
    
}

export const findUserByEmail = async (email)=>{
    try{
        const user= await userModel.findOne({email: email})
        return user
    }catch(error){
        throw error
    }
}

export const createUser = async (user)=>{
    try{
        let userCart= await createCart()
        user.idCart=userCart._id
        const newUser=new userModel(user)
        await newUser.save();
        return newUser
    }catch(error){
        throw error
    }
    
}

export const deleteUser = async (mail)=>{
    try {
        const user=await findUserByEmail(mail)
    if(user){
        await deleteCart(user.idCart)
    }
    return userModel.findOneAndDelete({email: mail});
    } catch (error) {
        throw error
    }
    
}

export const lastConnectionUser = async (id)=>{
    try {
       const lastConnect= await userModel.findByIdAndUpdate(id,{last_connection:Date.now()})
        return lastConnect
    } catch (error) {
        throw error
    }
    
}

export const updateDocumentsUser= async (id,newDoc) =>{
    try{
        const upload =await userModel.findByIdAndUpdate(id,{$addToSet: {documents: newDoc}})
        return upload
    }catch(error){
        throw error
    }
  
}
