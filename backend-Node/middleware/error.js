//maneja los errores

const errorHandler = (err, req, res, next) => {
    res.status(500).json({
        status: 500,
        mensaje: err.message
    })
}

module.exports = errorHandler;