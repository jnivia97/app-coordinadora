import TransportService from "../service/TransportService.js";
import logger from "../config/logger.js";


class TransportController {

    async allGetTransport(req, res) {

        try {
            logger.info("Consultar todos los transportadores libres")

            const transport = await TransportService.getAllTransportFree();

            if (!transport) {
                return res.status(404).json({ code: 1, message: "No hay transportadores existentes" });
            }

            res.json({token: transport})

        } catch (error) {
            logger.error(`[ERROR]: ${error.message}`);
            throw error;
        }



    }

}

export default new TransportController();