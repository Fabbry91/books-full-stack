//encapsula los errores en un objeto 

class ErrorResponse extends Error {

    constructor(mensaje, statusCode) {
        //crea el objeto y le inyecta un mensaje
        super(mensaje);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;