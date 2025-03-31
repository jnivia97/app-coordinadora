import logger from "../config/logger.js";
import AssignOrderService from "../service/AssignOrderService.js";


class AssignOrderController{

    async createNewAssign(req,res){
        try {
            logger.info(`Crear una nueva asignacion para => ${req.body.id_orden}`);

            const assign = await AssignOrderService.createAssign(req.body);

            if(!assign){
                return res.status(404).json({ code:1,message: "Asignacion no creada" });
            }

            res.json({token: assign});

        } catch (error) {
            logger.error("Error de respuesta");
            res.status(500).json({ code:1,message: "No se puedo crear asignacion, información incompleta o erronea" }); 
        }
    }

}

export default new AssignOrderController();