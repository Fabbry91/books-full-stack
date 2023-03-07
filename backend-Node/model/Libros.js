const moongose = require('mongoose');

const LibroSchema = new moongose.Schema({
    titulo: {
        require: [true, 'Ingrese un titulo del libro'],
        maxlength: [500, 'El titulo del libro no puede ser mayor a 500 caracteres'],
        type: String
    },
    descripcion: String,
    precio: Number,
    fechaDePublicacion: Date,
    autor: { id: String, nombreCompleto: String }
})

module.exports = moongose.model('Libro', LibroSchema);