import DeliveryService from "../service/DeliveryService.js";
import logger from "../config/logger.js";

class DeliveryController {

    async createDelivery(req, res){
        try{
            logger.info(`Crear nueva order de ${req.body.id_usuario} y destino ${req.body.direccion_destino}`);

            const order = await DeliveryService.createOrder(req.body);

            logger.warn(`Respuesta BD DeliveryController: ${order}`);

            if(!order){
                return res.status(404).json({ code:1,message: "Order no creada" });
            }
            

            res.json({token: order});

        }catch(error){
            logger.error("Error de respuesta DeliveryController-createDelivery");
            res.status(500).json({ code:1,message: "No se puedo crear orden, información incompleta o erronea" }); 
        }
    }

    async allOrders(req,res){
        try {
            logger.info("Consultar todas la ordenes");
            
            const allOrder = await DeliveryService.allOrders();
            
            if(!allOrder){
                return res.status(404).json({ code:1,message: "No hay ordenes existentes" });
            }
            
            res.json({token: allOrder})

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }

    async allOrdersFree(req,res){
        try {
            logger.info("Consultar todas la ordenes Service");
            
            const allOrder = await DeliveryService.allOrdersFree();
            
            if(!allOrder){
                return res.status(404).json({ code:1,message: "No hay ordenes existentes" });
            }

            res.json({token: allOrder})

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }

    async getOrderById(req,res){
        try {
            logger.info("Consultar la orden");
            
            const allOrder = await DeliveryService.orderById(req.body.id_orden);
            
            if(!allOrder){
                return res.status(404).json({ code:1,message: "No hay orden existente" });
            }
            
            res.json({token: allOrder})

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }

    async getOrderByUser(req,res){
        try {
            logger.info("Consultar la orden usuario " + req.body.id_usuario);
            
            const allOrder = await DeliveryService.orderByUser(req.body.id_usuario);
            
            if(!allOrder){
                return res.status(404).json({ code:1,message: "No hay orden existente" });
            }
            
            res.json({token: allOrder})

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }

    async getOrderByFilter(req,res){
        try {
            logger.info("Consultar la orden usuario " + req.body.id_usuario);
            
            const allOrder = await DeliveryService.orderByFilter(req.body.fechainicio,req.body.fechafin,req.body.estado,req.body.transportista);
            
            if(!allOrder){
                return res.status(404).json({ code:1,message: "No hay orden existente" });
            }
            
            res.json({token: allOrder})

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }
}

export default new DeliveryController();