class Delivery{

    constructor(

        id_orden,
        id_usuario,
        peso,
        dimensiones,
        tipo_producto,
        direccion_destino,
        estado,
        fecha_creacion,
        fecha_entrega
    ){
        this.id_orden = id_orden,
        this.id_usuario = id_usuario,
        this.peso = peso,
        this.dimensiones = dimensiones,
        this.tipo_producto = tipo_producto,
        this.direccion_destino = direccion_destino,
        this.estado = estado,
        this.fecha_creacion = fecha_creacion,
        this.fecha_entrega = fecha_entrega
    }

}

export default Delivery;