import { generateTicket,getTicketByPreferenceService } from "../services/ticketService.js"

export const generateTicketController = async(req,res)=>{
    const ticketObjectValidate = (ticketObject) =>{

        const requiredProperties=[
            "payment_id","payment_type","preference_id","amount","first_name","last_name","email","country","address","tel_number","products"
        ]
        for (const propertie of requiredProperties){
            if(!ticketObject.hasOwnProperty(propertie)){
                return false
            }

        }
      
        if(!Array.isArray(ticketObject.products) || ticketObject.products.length === 0 ){
            return false
        }
        for(const product of ticketObject.products){
            const productProperties =['id_product','thumbnail','title','quantity','unit_price']
            for(const propertie of productProperties){
                if(!product.hasOwnProperty(propertie) || product[propertie]===""){
                    return false
                }
            }
            
        }
        return true

    }
    const orderData = req.body;
    if(ticketObjectValidate(orderData)){
        console.log("Objeto Ticket Aprobado: ",orderData)
        await generateTicket(orderData)
    }
    else{

    }

}

export const getTicketByPreference = async(req,res)=>{
    try{
        const preferenceId=req.body;
        const ticket = await getTicketByPreferenceService(preferenceId)
        if(ticket)
        res.status(200).send({staus:"success",payload:ticket})
        else{
            res.status(400).send({status:"error",message:"No existe Ticket"})
        }

    }catch(error){
        res.status(400).send({status:"error",error:error})
    }
    

}