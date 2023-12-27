import { Router } from "express";
const routerLogger = Router();


routerLogger.get("/",(req,res) =>{
    req.logger.fatal("Test de mensaje de nivel FATAL");
    req.logger.error("Test de mensaje de nivel ERROR");
    req.logger.warning("Test de mensaje de nivel WARNING");
    req.logger.info("Test de mensaje de nivel INFO");
    req.logger.http("Test de mensaje de nivel HTTP");
    req.logger.debug("Test de mensaje de nivel DEBUG");
    res.send("Todos los Logs Testeados")
})

export default routerLogger