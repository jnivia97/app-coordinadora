class AssignOrder{
    constructor(
        id_asignacion,
        id_orden,
        id_ruta,
        id_transportista,
        fecha_asignacion
    ){
        this.id_asignacion = id_asignacion,
        this.id_orden = id_orden,
        this.id_ruta = id_ruta,
        this.id_transportista = id_transportista,
        this.fecha_asignacion = fecha_asignacion
    }
}

export default AssignOrder;