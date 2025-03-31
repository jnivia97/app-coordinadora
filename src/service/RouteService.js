import routeRepository from '../repository/routeRepository.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../config/logger.js';

dotenv.config();

const jwtSecret = Buffer.from(process.env.JWT_SECRET || "default_secret", "utf-8");

const rawExpiration = process.env.JWT_EXPIRATION;
const expiresIn = rawExpiration
    ? !isNaN(Number(rawExpiration))
        ? Number(rawExpiration)
        : rawExpiration
    : "1h";

class RouteService {

    async allRoutes(){
        try {
            logger.info("Consultar todas la rutas Service");
            
            const allroute = await routeRepository.allRoutesBD();
            
            if (!allroute) {
                logger.error("No es posible consultar las ordenes");
                throw new Error("Error al consultar las ordenes");
            }           

            const token = jwt.sign({data: allroute}, jwtSecret, {
                expiresIn: expiresIn
            });
            return token; 

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }

}

export default new RouteService();