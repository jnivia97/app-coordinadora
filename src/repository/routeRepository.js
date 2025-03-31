import Ruta from '../model/Route.js';
import pool from '../config/db.js';
import logger from '../config/logger.js';

class RouteRepository {

    async allRoutesBD(){
        logger.info("Consultar BD las rutas");
        try {
            const [resp] = await pool.query("SELECT * FROM rutas");
            
            resp.map(res => new Ruta(
                res.id_ruta,
                res.nombre_ruta,
                res.origen,
                res.destino
            ))

            return resp;

        } catch (error) {
            logger.error("Error al realizar la consulta de rutas");
            throw new Error(`[ERROR] Error de BD ${error.message}`);
        }
    }

}

export default new RouteRepository();