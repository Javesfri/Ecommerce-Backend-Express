import ticketModel from "../models/MongoDB/ticketModel.js";

export const generateTicket = async(orderData)=>{
    try{
        const newTicket =await new ticketModel(orderData)
        await newTicket.save()
        return newTicket
    }catch(error){
        throw(error)
    }
    
}

export const getTicketByPreferenceService = async(preferenceId)=>{
    try{
        const ticket= await ticketModel.findOne({preference_id:preferenceId})
        return ticket
    }catch(error){
        throw(error)
    }
}