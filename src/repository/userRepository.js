import User from "../model/User.js";
import pool from "../config/db.js";
import logger from "../config/logger.js";


class UserRepository {

    async getUserByEmail(correo) {
        logger.info(`Consultar BD info de usuario ${correo}`)
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE correo = ?",[correo]);

        if (rows.length === 0) logger.error(`No hay Info BD ${rows.length}`);     

        rows.map(row => new User(row.id_usuario,row.nombre,row.correo,row.password,row.rol));

        return rows.length > 0 ? rows[0] : null;
    }

}

export default new UserRepository();

