import logger from "../config/logger.js";
import LogisticsService from "../service/LogisticsService.js";


class LogistcsController{

    async createNewLogistics(req,res){

        try {
            logger.info(`Crear un nuevo report para => ${req.body.id_orden}`);

            const resLogistics = await LogisticsService.createLogistcs(req.body);

            if(!resLogistics){
                return res.status(404).json({ code:1,message: "reporte no creada" });
            }

            res.json({token: resLogistics});  
        } catch (error) {
            logger.error("Error de respuesta");
            res.status(500).json({ code:1,message: "No se puedo crear el reporte, información incompleta o erronea" }); 
        }
    }

    async reportePromTransportadores(req,res){

        try {
            logger.info(`Crear un nuevo report `);

            const resLogistics = await LogisticsService.reportPromTransport();

            if(!resLogistics){
                return res.status(404).json({ code:1,message: " no creada" });
            }

            res.json({token: resLogistics});  
        } catch (error) {
            logger.error("Error de respuesta");
            res.status(500).json({ code:1,message: "No se puedo crear el reporte, información incompleta o erronea" }); 
        }
    }

    async reportePeriodo(req,res){

        try {
            logger.info(`Crear un nuevo report `);

            const resLogistics = await LogisticsService.reportPeriod(req.body.fechaini,req.body.fechafin);

            if(!resLogistics){
                return res.status(404).json({ code:1,message: " no creada" });
            }

            res.json({token: resLogistics});  
        } catch (error) {
            logger.error("Error de respuesta");
            res.status(500).json({ code:1,message: "No se puedo crear el reporte, información incompleta o erronea" }); 
        }
    }
}

export default new LogistcsController();