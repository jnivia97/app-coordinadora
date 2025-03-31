import assignOrderRepository from '../repository/assignOrderRepository.js';
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

class AssignOrderService {

    async createAssign(asignacion) {

        try {
            logger.info(`Verificaion de asignamiento ${JSON.stringify(asignacion)}`);

            const newAssign = await assignOrderRepository.newAssignOrder(asignacion);


            if (!newAssign) {
                logger.error("No es posible crear la asignacion");
                throw new Error("Error al crear la asignacion");
            }



            const token = jwt.sign({data: newAssign}, jwtSecret, {
                expiresIn: expiresIn
            });

            return token;

        } catch (error) {
            logger.error(`[ERROR] service: ${error.message}`);
            throw error;
        }


    }
}

export default new AssignOrderService();