const { request, response } = require('express');
const Autor = require('../model/Autor');
const ErrorResponse = require('../helper/errorResponse')

//funsion que crea al Autor
const creaAutor = async (req, res = response, next) => {
    try {
        const autorData = new Autor(req.body)
        const saveAutor = await autorData.save();

        res.status(201).json({ msg: 'Autor creado con exito', autor: saveAutor });
    } catch (err) {
        next(new ErrorResponse(`No es posible crear el Autor ${err.message}`, 404));
    }
}

//funsion que obtener a los Autores
const getAutores = async (req, res = response, next) => {
    try {
        const autorList = await Autor.find({});
        res.status(200).json({ msg: 'Autores encontrados con exito', autorList: autorList });

    } catch (err) {
        next(new ErrorResponse(`No se pudo obtener los autores ${err.message}`, 404));
    }
}

//funsion que obtener al Autor por Id
const getAutorById = async (req, res = response, next) => {
    try {
        const autor = await Autor.findById(req.params.id);

        if (!autor) {
            return next(new ErrorResponse(`El autor con id ${req.params.id} no existe `, 404));
        }

        res.status(200).json({ msg: 'Autor encontrado con exito', autor: autor });

    } catch (err) {
        next(new ErrorResponse(`El autor con id ${req.params.id} no existe `, 404));
    }
}

const updateAutorById = async (req, res = response, next) => {

    try {
        //obtengo al autor por id
        const autor = await Autor.findById(req.params.id);

        //verifico si existe
        if (!autor) {
            return next(new ErrorResponse(`El autor con id ${req.params.id} no existe `, 404));
        }

        const autorActualizado = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(autorActualizado);

    } catch (err) {
        next(new ErrorResponse(`El autor con id ${req.params.id} no existe `, 404));
    }
}

const deleteAutor = async (req, res = response, next) => {

    try {
        const autor = await Autor.findById(req.params.id);
        //console.log(autor)
        if (!autor) {
            next(new ErrorResponse(`El autor con id ${req.params.id} no existe `, 404));
        }

        await autor.findByIdAndDelete(req.params.id);

        res.status(200).json({ msg: 'Autor eliminado exitosamente' });

    } catch (err) {
        next(new ErrorResponse(`El autor con id ${req.params.id} no existe `, 404));
    }
}

module.exports = {
    creaAutor,
    getAutores,
    getAutorById,
    updateAutorById,
    deleteAutor
}