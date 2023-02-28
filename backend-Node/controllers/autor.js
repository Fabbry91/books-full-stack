const { request, response } = require('express');
const Autor = require('../model/Autor');

//funsion que crea al Autor
const creaAutor = async (req, res = response) => {
    try {
        const autorData = new Autor(req.body)
        const saveAutor = await autorData.save();

        res.status(201).json({ msg: 'Autor creado con exito', autor: saveAutor });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
}

//funsion que obtener a los Autores
const getAutores = async (req, res = response) => {
    try {
        const autorList = await Autor.find({});
        res.status(200).json({ msg: 'Autores encontrados con exito', autorList: autorList });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
}

//funsion que obtener al Autor por Id
const getAutorById = async (req, res = response) => {
    try {
        const autor = await Autor.findById(req.params.id);

        if (!autor) {
            return res.status(404).json({ msg: 'Autor no existe' })
        }

        res.status(200).json({ msg: 'Autor encontrado con exito', autor: autor });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Sintaxis invalida",
        });
    }
}

const updateAutorById = async (req, res = response) => {

    try {
        //obtengo al autor por id
        const autor = await Autor.findById(req.params.id);

        //verifico si existe
        if (!autor) {
            return res.status(404).json({
                ok: false,
                msg: "El autor no existe"
            });
        }

        const autorActualizado = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(autorActualizado);

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
}

const deleteAutor = async (req, res = response) => {

    try {
        const autor = await Autor.findById(req.params.id);
        //console.log(autor)
        if (!autor) {
            return res.status(404).json({
                ok: false,
                msg: "El autor no existe"
            });
        }

        await autor.findByIdAndDelete(req.params.id);

        res.status(200).json({ msg: 'Autor eliminado exitosamente' });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el administrador",
        });
    }
}

module.exports = {
    creaAutor,
    getAutores,
    getAutorById,
    updateAutorById,
    deleteAutor
}