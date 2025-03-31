import transportRepository from '../repository/transportRepository.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
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

class TransportService {

    async getAllTransportFree() {

        try {
            logger.info("Verificar los transportadores free");

            const transportList = await transportRepository.getTransportFree();

            if (!transportList) {
                logger.error("No es posible consultar los transportadores libres");
                throw new Error("Error al consultar los transportadores libres");
            }

            const token = jwt.sign({ data: transportList }, jwtSecret, {
                expiresIn: expiresIn
            });
            return token;

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }

    }

}

export default new TransportService();