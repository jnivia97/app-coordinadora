import Delivery from '../model/Delivery.js';
import pool from '../config/db.js';
import logger from '../config/logger.js';
import moment from 'moment';



class DeliveryRepository {

    async newDelivery(delivery) {
        logger.info(`Crear nueva orden del usuario => ${JSON.stringify(delivery)}`);
        try {
            const fechaCreacion = moment(delivery.fecha_creacion).format('YYYY-MM-DD HH:mm:ss');
            const fechaEntrega = moment(delivery.fecha_entrega).format('YYYY-MM-DD HH:mm:ss');
            const [resp] = await pool.query("INSERT INTO ordenes_envio (id_usuario, peso, dimensiones, tipo_producto, direccion_destino, estado, fecha_creacion, fecha_entrega) VALUES (?,?,?,?,?,?,?,?)",
                [
                    delivery.id_usuario,
                    Number(delivery.peso.toFixed(2)),
                    delivery.dimensiones,
                    delivery.tipo_producto,
                    delivery.direccion_destino,
                    delivery.estado,
                    fechaCreacion,
                    fechaEntrega
                ]
            )

            if (resp.affectedRows > 0) {
                logger.info(`Se creó correctamente la orden ${JSON.stringify(resp)}`);
                return new Delivery(
                    resp.insertId,
                    delivery.id_usuario,
                    delivery.peso,
                    delivery.dimensiones,
                    delivery.tipo_producto,
                    delivery.direccion_destino,
                    delivery.estado,
                    fechaCreacion,
                    fechaEntrega
                );
            } else {
                logger.error("No es posible crear la orden");
                return null;
            }
        } catch (error) {
            logger.error("Información de la orden erronea");
            throw new Error(error.message);
        }

    }


    async getAllOrders() {
        logger.info("Consultar BD todas la ordenes");
        try {
            const [orders] = await pool.query("SELECT * FROM ordenes_envio");

            if (orders.length > 0) {
                orders.map(order => new Delivery(
                    order.id_order,
                    order.id_usuario,
                    order.peso,
                    order.dimensiones,
                    order.tipo_producto,
                    order.direccion_destino,
                    order.estado,
                    order.fecha_creacion,
                    order.fecha_entrega
                ));
                return orders;
            } else {
                logger.error("No es posible consultar la información");
                return [];
            }

        } catch (error) {
            logger.error("Error al realizar la consulta de ordenes");
            throw new Error(`[ERROR] Error de BD ${error.message}`);
        }
    }

    async getAllOrdersFree() {
        logger.info("Consultar BD todas la ordenes no han sido asignadas");
        try {
            const [orders] = await pool.query("SELECT * FROM ordenes_envio WHERE id_orden NOT IN (SELECT id_orden FROM asignaciones_envio) AND estado = 'En espera'");

            if (orders.length > 0) {
                orders.map(order => new Delivery(
                    order.id_order,
                    order.id_usuario,
                    order.peso,
                    order.dimensiones,
                    order.tipo_producto,
                    order.direccion_destino,
                    order.estado,
                    order.fecha_creacion,
                    order.fecha_entrega
                ));
                return orders;
            } else {
                logger.error("No es posible consultar la información");
                return [];
            }

        } catch (error) {
            logger.error("Error al realizar la consulta de ordenes");
            throw new Error(`[ERROR] Error de BD ${error.message}`);
        }
    }

    async getOrderById(id_orden) {
        logger.info("Consultar BD la orden");
        try {
            const [orders] = await pool.query("SELECT * FROM ordenes_envio WHERE id_orden = ?", [id_orden]);

            if (orders.length > 0) {
                orders.map(order => new Delivery(
                    order.id_order,
                    order.id_usuario,
                    order.peso,
                    order.dimensiones,
                    order.tipo_producto,
                    order.direccion_destino,
                    order.estado,
                    order.fecha_creacion,
                    order.fecha_entrega
                ));
                return orders;
            } else {
                logger.error("No es posible consultar la información");
                return [];
            }

        } catch (error) {
            logger.error("Error al realizar la consulta de ordenes");
            throw new Error(`[ERROR] Error de BD ${error.message}`);
        }
    }

    async getOrderByUser(id_usuario) {
        logger.info(`Consultar BD la orden usuario ${id_usuario}`);
        try {
            const [orders] = await pool.query("SELECT * FROM ordenes_envio WHERE id_usuario = ?", [id_usuario]);

            if (orders.length > 0) {
                orders.map(order => new Delivery(
                    order.id_order,
                    order.id_usuario,
                    order.peso,
                    order.dimensiones,
                    order.tipo_producto,
                    order.direccion_destino,
                    order.estado,
                    order.fecha_creacion,
                    order.fecha_entrega
                ));
                return orders;
            } else {
                logger.error("No es posible consultar la información");
                return [];
            }

        } catch (error) {
            logger.error("Error al realizar la consulta de orden usuario");
            throw new Error(`[ERROR] Error de BD ${error.message}`);
        }
    }

    async getOrderFilter(fechaInicial, fechaFinal, estado, transportista) {
        logger.info(`Consultar BD la orden filtros ${fechaInicial} ${fechaFinal} ${estado} ${transportista}`);
        try {
            const [orders] = await pool.query(`
                SELECT 
                oe.id_orden,
                oe.tipo_producto,
                oe.peso,
                oe.direccion_destino,
                rl.estado_actual,
                t.nombre AS transportista,
                rl.tiempo_entrega,
                oe.fecha_creacion
                FROM ordenes_envio oe
                JOIN asignaciones_envio ae ON oe.id_orden = ae.id_orden
                JOIN transportistas t ON ae.id_transportista = t.id_transportista
                JOIN reportes_logisticos rl ON oe.id_orden = rl.id_orden
                WHERE (oe.fecha_creacion BETWEEN ? AND ?) 
                AND (rl.estado_actual = ?)
                AND (t.id_transportista = ?)
                ORDER BY oe.fecha_creacion DESC`, [fechaInicial,fechaFinal,estado,transportista]);

            if (orders.length > 0) {
                return orders;
            } else {
                logger.error("No es posible consultar la información");
                return [];
            }

        } catch (error) {
            logger.error("Error al realizar la consulta de orden");
            throw new Error(`[ERROR] Error de BD ${error.message}`);
        }
    }
    

}

export default new DeliveryRepository();