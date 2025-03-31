import pool from '../config/db.js';
import logger from '../config/logger.js';
import Logistcs from '../model/Logistics.js';

class LogistcsRepository{

    async newReport(reporte){
        try {
            const [resp] = await pool.query("INSERT INTO reportes_logisticos (id_orden, id_transportista, tiempo_entrega, estado_actual) VALUES (?, ?, ?, ?)",
                [
                    reporte.id_orden,
                    reporte.id_transportista,
                    Number(reporte.tiempo_entrega.toFixed(2)),                    
                    reporte.estado_actual
                ]
            )

            if(resp.affectedRows > 0){
                logger.info(`Se creó correctamente el reporte ${JSON.stringify(resp)}`);
                return new Logistcs(
                    resp.insertId,
                    reporte.id_orden,
                    reporte.id_transportista,
                    reporte.estado_actual
                );
            }else{
                logger.error("No es posible crear el reporte");
                return null;
            }
        } catch (error) {
            logger.error("Información del reporte erronea");
            throw new Error(error.message);
        }
    }

    async promTransport(){

        logger.info(`Consultar BD la promedio transportista`);
        try {
            const [report] = await pool.query(`
                SELECT 
                    t.nombre AS transportista,
                    COUNT(rl.id_reporte) AS total_envios,
                    AVG(rl.tiempo_entrega) AS tiempo_promedio_entrega
                FROM reportes_logisticos rl
                JOIN transportistas t ON rl.id_transportista = t.id_transportista
                WHERE rl.estado_actual = 'Entregado'
                GROUP BY t.nombre
                ORDER BY tiempo_promedio_entrega ASC;

                `);

            if (report.length > 0) {
                return report;
            } else {
                logger.error("No es posible consultar la información");
                return [];
            }

        } catch (error) {
            logger.error("Error al realizar la consulta de report");
            throw new Error(`[ERROR] Error de BD ${error.message}`);
        }

    }

    async completePeriod(fechainicio, fechafin){

        logger.info(`Consultar BD envíos completados en un período ${fechainicio} - ${fechafin}`);
        try {
            const [report] = await pool.query(`
                SELECT 
                    COUNT(id_reporte) AS total_envios,
                    DATE(fecha_reporte) AS fecha
                FROM reportes_logisticos
                WHERE estado_actual = 'Entregado'
                AND fecha_reporte BETWEEN ? AND ?
                GROUP BY DATE(fecha_reporte)
                ORDER BY fecha DESC;
                `,[fechainicio,fechafin]);

            if (report.length > 0) {
                return report;
            } else {
                logger.error("No es posible consultar la información");
                return [];
            }

        } catch (error) {
            logger.error("Error al realizar la consulta de report");
            throw new Error(`[ERROR] Error de BD ${error.message}`);
        }

    }

    
}

export default new LogistcsRepository();