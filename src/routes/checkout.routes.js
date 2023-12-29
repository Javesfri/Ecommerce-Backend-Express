import { Router } from "express";
import { authenticate } from "../middlewares/authentication.js";
import { generateTicketController } from "../controllers/ticket.controller.js";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({ accessToken: process.env.ACCESS_TOKEN });

const preferences = new Preference(client);

const routerCheckout = Router();

routerCheckout.post("/create_preference", (req, res) => {
  console.log(req.body)
  const itemsBody = req.body.items.map(item =>({
    title: item.title,
    unit_price: Number(item.unit_price),
    quantity: Number(item.quantity),
    id:item.id

  }))

  preferences
    .create({ body: {
      items: itemsBody,
      back_urls: {
        success: "http://localhost:3000/payment-status/",
        failure: "http://localhost:3000/payment-status/",
        pending: "http://localhost:3000/payment-status/",
      },
      auto_return: "approved",
    } })
    .then((response) => {
      res.json( {id: response.id} );
    })
    .catch((error) => {
      console.log(error)
      res.status(500).send({ error: error });
    });
});

routerCheckout.get("/feedback", (req, res) => {
 res.redirect(301,'http://localhost:3000/payment-status')
});

routerCheckout.get("/secret_key",(req,res) =>{
  try{
    res.json({secretKey: process.env.CRYPT_SECRET})
  }catch(error){
    res.json({error:error})
  }
})


routerCheckout.post("/generate_purchase_ticket",authenticate,generateTicketController)

routerCheckout.post("/notification",(req,res)=>{
  console.log(req.body)
  res.status(200).send("ok")
})

export default routerCheckout
