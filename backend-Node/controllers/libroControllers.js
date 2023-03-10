const { request, response } = require('express');
const Libro = require('../model/Libros')
const ErrorResponse = require('../helper/errorResponse');


const getLibros = async (req, res = response, next) => {
    try {
        const libros = await Libro.find();
        res.status(200).json(libros);
    } catch (error) {
        next(new ErrorResponse(`No se pudo procesar el reques ${error.message}`, 404))
    }
}

const getLibroById = async (req, res = response, next) => {
    try {
        const libroUnique = await Libro.findById(req.params.id);

        if (!libroUnique) {
            return next(new ErrorResponse(`No se pudo encontrar el libro ${error.message}`, 404))
        }
        res.status(200).json(libroUnique);

    } catch (error) {
        next(new ErrorResponse(`No se pudo encontrar el libro ${error.message}`, 404))
    }
}

const postLibro = async (req, res = response, next) => {
    try {
        const libro = await Libro.create(req.body);

        res.status(200).json({
            status: 200,
            data: libro
        });

    } catch (error) {
        next(new ErrorResponse(`No se pudo procesar el reques ${error.message}`, 404))
    }
}

const putLibro = async (req, res = response, next) => {
    try {
        const libroUnique = await Libro.findByIdAndUpdate(req.params.id, req.body);

        if (!libroUnique) {
            return next(new ErrorResponse(`No se pudo encontrar el libro ${error.message}`, 404))
        }
        res.status(200).json(libroUnique);

    } catch (error) {
        next(new ErrorResponse(`No se pudo encontrar el libro ${error.message}`, 404))
    }
}

const deleteLibro = async (req, res = response, next) => {
    try {
        const libroUnique = await Libro.findByIdAndDelete(req.params.id);

        if (!libroUnique) {
            return next(new ErrorResponse(`No existe el libro ${req.params.id}`, 400))
        }
        res.status(200).json(libroUnique);

    } catch (error) {
        next(new ErrorResponse(`No existe el libro ${req.params.id}`, 400))
    }
}

const pagination = async (req, res, next) => {
    try {
        //ordenamiento
        const sort = req.body.sort;
        //ascendente o descendente
        const sortDireccion = req.body.sortDireccion;
        //paginas
        const page = parseInt(req.body.page);
        //tama??o de paginacion
        const pageSize = parseInt(req.body.pageSize);

        let filterValor = "";
        let filterPropiedad = "";

        let libros = [];
        //cantidad de record
        let totalRecord = 0;

        if (req.body.filterValue) {
            filterValor = req.body.filterValue.valor;
            filterPropiedad = req.body.filterValue.propiedad;

            libros = await Libro.find({
                [filterPropiedad]: new RegExp(filterValor, "i")
            })
                .sort({ [sort]: sortDireccion })
                .skip((page - 1) * pageSize)
                .limit(pageSize)

            totalRecord = await Libro.find({
                [filterPropiedad]: new RegExp(filterValor, "i")
            }).countDocuments();

        } else {
            //traemos todos los libros, los ordenamos y odenamos ascendente o descendente
            libros = await Libro.find()
                .sort({ [sort]: sortDireccion })
                .skip((page - 1) * pageSize) //indica desde donde quiero empezar a leer;
                .limit(pageSize) //intervalo final
            totalRecord = await Libro.countDocuments(); // cuenta la cantidad de datos guardado
        }

        const pageQuantity = Math.ceil(totalRecord / pageSize);

        res.status(200).json({
            status: 200,
            pageSize,
            page,
            sort,
            sortDireccion,
            pageQuantity,
            totalRecord,
            data: libros,
        })

    } catch (error) {
        next(new ErrorResponse(`No funciona la paginacion ${req.params.id}`, 400))
    }
}

module.exports = {
    getLibroById,
    getLibros,
    postLibro,
    putLibro,
    deleteLibro,
    pagination
}