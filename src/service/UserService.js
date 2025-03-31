import UserRepository from '../repository/userRepository.js';
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

class UserService {

    async getInfoUser(correo, password) {
        try {
            logger.info(`Verificación de info de usuario ${correo}`);
    
            const user = await UserRepository.getUserByEmail(correo);
    
            if (!user) {
                logger.error(`Usuario no encontrado: ${correo}`);
                throw new Error("Usuario no encontrado");
            }
    
            const isPass = Object.is(password,user.password);
            if (!isPass) {
                logger.error(`Contraseña incorrecta para el usuario: ${correo}`);
                throw new Error("Contraseña incorrecta");
            }
    
            const token = jwt.sign({ id_user: user.id_usuario, email: user.correo, rol: user.rol }, jwtSecret, {
                expiresIn: expiresIn
            });
    
            return token;
        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }
    }
    
}

export default new UserService();

