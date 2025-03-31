import logistcsRepository from '../repository/logistcsRepository.js';
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

class LogistcsService{

    async createLogistcs(logistcs){

        try {
            logger.info(`Verificaion de logistica ${JSON.stringify(logistcs)}`);

            const newLog = await logistcsRepository.newReport(logistcs);


            if (!newLog) {
                logger.error("No es posible crear la asignacion");
                throw new Error("Error al crear la asignacion");
            }

            const token = jwt.sign({data: newLog}, jwtSecret, {
                expiresIn: expiresIn
            });

            return token;
        } catch (error) {
            logger.error(`[ERROR] service: ${error.message}`);
            throw error;   
        }

    }

    async reportPromTransport(){

        try {

            const newLog = await logistcsRepository.promTransport();


            if (!newLog) {
                logger.error("No es posible crear la asignacion");
                throw new Error("Error al crear la asignacion");
            }

            const token = jwt.sign({data: newLog}, jwtSecret, {
                expiresIn: expiresIn
            });

            return token;
        } catch (error) {
            logger.error(`[ERROR] service: ${error.message}`);
            throw error;   
        }

    }

    async reportPeriod(fechaIni,fechaFin){

        try {

            const newLog = await logistcsRepository.completePeriod(fechaIni,fechaFin);


            if (!newLog) {
                logger.error("No es posible crear la asignacion");
                throw new Error("Error al crear la asignacion");
            }

            const token = jwt.sign({data: newLog}, jwtSecret, {
                expiresIn: expiresIn
            });

            return token;
        } catch (error) {
            logger.error(`[ERROR] service: ${error.message}`);
            throw error;   
        }

    }
}

export default new LogistcsService();