import deliveryRepository from "../repository/deliveryRepository.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../config/logger.js';
import { loggers } from "winston";

dotenv.config();

const jwtSecret = Buffer.from(process.env.JWT_SECRET || "default_secret", "utf-8");

const rawExpiration = process.env.JWT_EXPIRATION;
const expiresIn = rawExpiration
    ? !isNaN(Number(rawExpiration))
        ? Number(rawExpiration)
        : rawExpiration
    : "1h";

class DeliveryService {

    async createOrder(order) {
        try {
            logger.info("Creación de la orden Service");

            const newOrder = await deliveryRepository.newDelivery(order);

            if (!newOrder) {
                logger.error("No es posible crear la orden");
                throw new Error("Error al crear la orden");
            }

            const dataToken = {
                orden: newOrder.id_orden,
                usuario: newOrder.id_usuario,
                peso: newOrder.peso,
                dimensiones: newOrder.dimensiones,
                tipoProducto: newOrder.tipo_producto,
                direccionDestino: newOrder.direccion_destino,
                estado: newOrder.estado,
                fechaCreacion: newOrder.fecha_creacion,
                fechaEntrega: newOrder.fecha_entrega
            };

            const token = jwt.sign(dataToken, jwtSecret, {
                expiresIn: expiresIn
            });

            return token;
        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }

    }

    async allOrders(){
        try {
            logger.info("Consultar todas la ordenes Service");
            
            const allOrder = await deliveryRepository.getAllOrders();
            
            if (!allOrder) {
                logger.error("No es posible consultar las ordenes");
                throw new Error("Error al consultar las ordenes");
            }           

            const token = jwt.sign({data: allOrder}, jwtSecret, {
                expiresIn: expiresIn
            });
            return token; 

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }

    async allOrdersFree(){
        try {
            logger.info("Consultar todas la ordenes Service");
            
            const allOrder = await deliveryRepository.getAllOrdersFree();
            
            if (!allOrder) {
                logger.error("No es posible consultar las ordenes");
                throw new Error("Error al consultar las ordenes");
            }

            

            const token = jwt.sign({data: allOrder}, jwtSecret, {
                expiresIn: expiresIn
            });

            return token; 

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }

    async orderById(id){
        try {
            logger.info("Consultar la orden por id Service");
            
            const allOrder = await deliveryRepository.getOrderById(id);
            
            if (!allOrder) {
                logger.error("No es posible consultar la orden");
                throw new Error("Error al consultar la orden");
            }           

            const token = jwt.sign({data: allOrder}, jwtSecret, {
                expiresIn: expiresIn
            });
            return token; 

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }

    async orderByUser(user){
        try {
            logger.info(`Consultar la orden por id Service ${user}`);
            
            const allOrder = await deliveryRepository.getOrderByUser(user);
            
            if (!allOrder) {
                logger.error("No es posible consultar la orden");
                throw new Error("Error al consultar la orden");
            }           

            const token = jwt.sign({data: allOrder}, jwtSecret, {
                expiresIn: expiresIn
            });
            return token; 

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }

    async orderByFilter(fechaini,fechafin,estado,transportista){
        try {
            logger.info(`Consultar la orden por filter Service`);
            
            const allOrder = await deliveryRepository.getOrderFilter(fechaini,fechafin,estado,transportista);
            
            if (!allOrder) {
                logger.error("No es posible consultar la orden");
                throw new Error("Error al consultar la orden");
            }           

            const token = jwt.sign({data: allOrder}, jwtSecret, {
                expiresIn: expiresIn
            });
            return token; 

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }
    
}

export default new DeliveryService();