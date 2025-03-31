import Transportador from "../model/Transportador.js";
import pool from "../config/db.js";
import logger from "../config/logger.js";


class TransportRepository{
    
    async getTransportFree(){

        logger.info("consulta bd transportistas disponibles con capacidad suficiente");

        const rows = await pool.query(" SELECT * FROM transportistas WHERE disponible = TRUE AND capacidad_vehiculo >= (SELECT MAX(peso) FROM ordenes_envio WHERE estado = 'En espera')");

        if (rows.length === 0) logger.error(`No hay Info BD ${rows.length}`);     

        rows.map(row => new Transportador(row.id_transportista, row.nombre, row.capacidad_vehiculo, row.diponible));

        return rows.length > 0 ? rows[0] : null;

    }

}

export default new TransportRepository();