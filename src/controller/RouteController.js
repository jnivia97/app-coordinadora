import RouteService from "../service/RouteService.js";
import logger from "../config/logger.js";

class RouteController {

    async getAllRoutes(req,res){
        try {
            logger.info("Consultar todas la rutas controller");
            
            const listRoute = await RouteService.allRoutes();
            
            if(!listRoute){
                return res.status(404).json({ code:1,message: "No hay rutas existentes" });
            }
            
            res.json({token: listRoute})

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }

}

export default new RouteController();