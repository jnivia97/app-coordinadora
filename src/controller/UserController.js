import UserService from '../service/UserService.js';
import logger from '../config/logger.js';


class UserController {

    async loginUser(req, res) {

        const { email, password } = req.body;

        try {

            logger.info(`Login email ${email}`);

            const user = await UserService.getInfoUser(email, password);

            logger.warn(`Repuesta BD UserController: ${user}`);

            if (!user) {
                return res.status(404).json({ code:1,message: "Usuario no encontrado" })
            }

            res.json({ token: user});
        } catch (error) {
            logger.error("Error de respuesta UserController-login");
            res.status(500).json({ code:1,message: "Usuario o contraseña incorrecta" });
        }

    }
}

export default new UserController();