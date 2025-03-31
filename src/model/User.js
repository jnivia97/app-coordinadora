class User {
    constructor(
        
        id_usuario,
        nombre,
        correo,
        password,
        rol
    ) {
        this.id_usuario = id_usuario,
        this.nombre = nombre,
        this.correo = correo,
        this.password = password,
        this.rol = rol
    }
}

export default User;