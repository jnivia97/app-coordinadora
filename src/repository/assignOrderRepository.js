import AssignOrder from '../model/AssignOrder.js';
import pool from '../config/db.js';
import logger from '../config/logger.js';
import moment from 'moment';

class AssignOrderRepository {

    async newAssignOrder(asignacion) {

        logger.info(`Crear nueva asignacion BD => ${JSON.stringify(asignacion)}`);
        try {

            const [resp] = await pool.query(`INSERT INTO asignaciones_envio (id_orden, id_ruta, id_transportista)
            SELECT 
                oe.id_orden, 
                r.id_ruta, 
                t.id_transportista
            FROM ordenes_envio oe
            JOIN rutas r ON r.id_ruta = ?
            JOIN transportistas t ON t.id_transportista = ?
            WHERE oe.id_orden = ? 
            AND t.disponible = TRUE
            AND t.capacidad_vehiculo >= oe.peso;`,[asignacion.id_ruta,asignacion.id_transportista,asignacion.id_orden]);

            if(resp.affectedRows > 0){
                logger.info("Se creó correctamente la asignacion");
                return new AssignOrder(
                    resp.insertId,
                    asignacion.id_orden,
                    asignacion.id_ruta,
                    asignacion.id_transportista
                );
            }else{
                logger.error("No es posible asignar la orden");
                return null;
            }

        } catch (error) {
            logger.error("Información de la asignación erronea");
            throw new Error(error.message); 
        }


    }

}

export default new AssignOrderRepository();