import 'dotenv/config.js'
import express from "express";
import routerProduct from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import routerUser from "./routes/user.routes.js";
import routerLogger from './routes/logger.routes.js';
import routerSession from "./routes/session.routes.js";
import routerCheckout from './routes/checkout.routes.js';
import routerPassRecover from './routes/passrecover.routes.js';
import { __dirname, __filename } from "./path.js";
import bodyParser from "body-parser";
import passport from "passport";
import cookieParser from "cookie-parser";
import initializePassport from './config/passport.js'
import mongoose from "mongoose";
import { addLogger } from './utils/logger.js';
import methodOverride from 'method-override'
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express'
import cors from "cors"

const whiteList =['http://localhost:3000']

const corsOptions = {
  origin:"", // Reemplaza esto con tu origen correcto
  credentials: true, // Esto es importante para permitir el uso de cookies
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Agrega los métodos que necesites
  allowedHeaders: "Content-Type,Authorization", // Agrega los encabezados permitidos
};
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server on Port ${PORT}`);
});




//Connect DB
const connectionMongoose = async () => {
  try {
    await mongoose.connect(process.env.URLMONGODB)
    console.log("DB is connected")
  } catch (error) {
    console.log( "ERror: "+await error) 
  }
};
connectionMongoose()



//Swagger

const swaggerOptions ={
  definition:{
    openapi:"3.0.1",
    info:{
      title:"Documentación del Ecommerce",
      description:"API pensada para manejar usuarios y carritos"

    }
  },
  apis:[`${__dirname}/docs/**/*.yaml`]
}

const specs=swaggerJSDoc(swaggerOptions);
app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(specs))


//Middlewares
app.use(express.json());
app.use(cookieParser("coder1234"))
app.use(bodyParser.json())
initializePassport()
app.use(passport.initialize())
app.use(addLogger)
app.use(cors(corsOptions))

//Routes
app.use("/static", express.static(__dirname + "/public"));
app.use("/", express.static(__dirname + "/public"));
app.use("/api/products", routerProduct);
app.use("/api/carts", routerCart);
app.use('/api/users/', routerUser);
app.use('/api/session/', routerSession);
app.use('/api/checkout/',routerCheckout);
app.use("/loggerTest",routerLogger);
app.use("/passRecovery",routerPassRecover);


